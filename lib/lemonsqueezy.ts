import crypto from "node:crypto";

export const SUPPORTED_LEMON_SQUEEZY_EVENTS = [
  "order_created",
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
  "subscription_expired",
] as const;

export type LemonSqueezyEventName = (typeof SUPPORTED_LEMON_SQUEEZY_EVENTS)[number];

export type LemonSqueezyAttributes = {
  status?: string | null;
  email?: string | null;
  user_email?: string | null;
  customer_email?: string | null;
  subscription_id?: string | number | null;
  order_id?: string | number | null;
  product_name?: string | null;
  variant_name?: string | null;
  ends_at?: string | null;
  custom_data?: Record<string, unknown> | null;
  first_order_item?: {
    product_name?: string | null;
    variant_name?: string | null;
  } | null;
  [key: string]: unknown;
};

export type LemonSqueezyWebhookPayload = {
  meta?: {
    event_name?: string | null;
    custom_data?: Record<string, unknown> | null;
    [key: string]: unknown;
  } | null;
  data?: {
    id?: string | null;
    type?: string | null;
    attributes?: LemonSqueezyAttributes | null;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
};

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "on_trial"]);

export function getLemonSqueezyWebhookSecret() {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error("Missing required environment variable: LEMON_SQUEEZY_WEBHOOK_SECRET");
  }

  return secret;
}

export function verifyLemonSqueezySignature({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string;
  signature: string | null;
  secret: string;
}) {
  if (!rawBody || !signature) {
    return false;
  }

  const expected = Buffer.from(
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex",
  );
  const received = Buffer.from(signature, "hex");

  if (expected.length === 0 || received.length === 0 || expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}

export function getLemonSqueezyEventName(payload: LemonSqueezyWebhookPayload) {
  return payload.meta?.event_name?.trim() ?? "";
}

export function getLemonSqueezyEmail(payload: LemonSqueezyWebhookPayload) {
  const attributes = payload.data?.attributes;
  const metaEmail = payload.meta?.custom_data?.email;
  const nestedEmail = attributes?.custom_data?.email;
  const email =
    attributes?.user_email ??
    attributes?.customer_email ??
    attributes?.email ??
    (typeof nestedEmail === "string" ? nestedEmail : null) ??
    (typeof metaEmail === "string" ? metaEmail : null);

  return typeof email === "string" && email.trim() ? email.trim().toLowerCase() : null;
}

export function isSupportedLemonSqueezyEvent(eventName: string): eventName is LemonSqueezyEventName {
  return (SUPPORTED_LEMON_SQUEEZY_EVENTS as readonly string[]).includes(eventName);
}

export function isActiveSubscriptionStatus(status: string | null | undefined) {
  return ACTIVE_SUBSCRIPTION_STATUSES.has(status?.trim().toLowerCase() ?? "");
}

export function resolveProState(eventName: string, status: string | null | undefined) {
  if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
    return false;
  }

  return isActiveSubscriptionStatus(status);
}
