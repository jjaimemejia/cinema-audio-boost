import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import {
  type LemonSqueezyAttributes,
  type LemonSqueezyWebhookPayload,
  getLemonSqueezyEmail,
  getLemonSqueezyEventName,
  getLemonSqueezyWebhookSecret,
  isSupportedLemonSqueezyEvent,
  resolveProState,
  verifyLemonSqueezySignature,
} from "@/lib/lemonsqueezy";

export const runtime = "nodejs";

type SubscriptionWrite = {
  subscription_id?: string | null;
  order_id?: string | null;
  email?: string | null;
  status?: string | null;
  is_pro: boolean;
  variant_name?: string | null;
  product_name?: string | null;
  ends_at?: string | null;
};

function asString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized ? normalized : null;
}

function asIdentifier(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return asString(value);
}

function compactRecord<T extends Record<string, unknown>>(record: T) {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined)) as T;
}

function extractAttributes(payload: LemonSqueezyWebhookPayload): LemonSqueezyAttributes {
  return payload.data?.attributes ?? {};
}

function extractProductName(attributes: LemonSqueezyAttributes) {
  return (
    asString(attributes.product_name) ??
    asString(attributes.first_order_item?.product_name) ??
    null
  );
}

function extractVariantName(attributes: LemonSqueezyAttributes) {
  return (
    asString(attributes.variant_name) ??
    asString(attributes.first_order_item?.variant_name) ??
    null
  );
}

function buildSubscriptionWrite(
  payload: LemonSqueezyWebhookPayload,
  eventName: string,
): SubscriptionWrite | null {
  const attributes = extractAttributes(payload);
  const dataType = asString(payload.data?.type);
  const subscriptionId =
    (dataType === "subscriptions" ? asIdentifier(payload.data?.id) : null) ??
    asIdentifier(attributes.subscription_id);
  const orderId =
    asIdentifier(attributes.order_id) ??
    (eventName === "order_created" ? asIdentifier(payload.data?.id) : null);
  const normalizedStatus =
    asString(attributes.status)?.toLowerCase() ??
    (eventName === "subscription_cancelled"
      ? "cancelled"
      : eventName === "subscription_expired"
        ? "expired"
        : null);
  const email = getLemonSqueezyEmail(payload);

  if (!subscriptionId && !email) {
    return null;
  }

  return compactRecord({
    subscription_id: subscriptionId,
    order_id: orderId,
    email,
    status: normalizedStatus,
    is_pro: resolveProState(eventName, normalizedStatus),
    variant_name: extractVariantName(attributes),
    product_name: extractProductName(attributes),
    ends_at: asString(attributes.ends_at),
  });
}

async function recordWebhookEvent(args: {
  eventName: string;
  payload: LemonSqueezyWebhookPayload;
  signature: string | null;
}) {
  const supabase = getSupabaseAdminClient();
  const attempts: Array<Record<string, unknown>> = [
    {
      event_name: args.eventName,
      payload: args.payload,
      signature: args.signature,
    },
    {
      event_name: args.eventName,
      payload: args.payload,
    },
    {
      event_name: args.eventName,
      body: args.payload,
    },
    {
      payload: args.payload,
    },
  ];

  let lastError: string | null = null;

  for (const attempt of attempts) {
    const { error } = await supabase.from("webhook_events").insert(attempt);

    if (!error) {
      return;
    }

    lastError = error.message;
  }

  throw new Error(lastError ?? "Unable to store webhook event");
}

async function syncSubscription(record: SubscriptionWrite) {
  const supabase = getSupabaseAdminClient();
  const recordsToTry = [
    compactRecord({
      subscription_id: record.subscription_id,
      order_id: record.order_id,
      email: record.email,
      status: record.status,
      is_pro: record.is_pro,
      variant_name: record.variant_name,
      product_name: record.product_name,
      ends_at: record.ends_at,
    }),
    compactRecord({
      subscription_id: record.subscription_id,
      email: record.email,
      status: record.status,
      is_pro: record.is_pro,
      variant_name: record.variant_name,
      product_name: record.product_name,
      ends_at: record.ends_at,
    }),
    compactRecord({
      subscription_id: record.subscription_id,
      email: record.email,
      status: record.status,
      is_pro: record.is_pro,
      ends_at: record.ends_at,
    }),
  ];

  const conflicts = [record.subscription_id ? "subscription_id" : null, record.email ? "email" : null].filter(
    (value): value is string => Boolean(value),
  );

  let lastError: string | null = null;

  for (const conflict of conflicts) {
    for (const candidate of recordsToTry) {
      const { error } = await supabase
        .from("subscriptions")
        .upsert(candidate, { onConflict: conflict, ignoreDuplicates: false });

      if (!error) {
        return;
      }

      lastError = error.message;
    }
  }

  if (record.subscription_id) {
    for (const candidate of recordsToTry) {
      const { error } = await supabase
        .from("subscriptions")
        .update(candidate)
        .eq("subscription_id", record.subscription_id);

      if (!error) {
        return;
      }

      lastError = error.message;
    }
  }

  if (record.email) {
    for (const candidate of recordsToTry) {
      const { error } = await supabase.from("subscriptions").update(candidate).eq("email", record.email);

      if (!error) {
        return;
      }

      lastError = error.message;
    }
  }

  throw new Error(lastError ?? "Unable to sync subscription");
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");
  const secret = getLemonSqueezyWebhookSecret();

  if (!verifyLemonSqueezySignature({ rawBody, signature, secret })) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let payload: LemonSqueezyWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as LemonSqueezyWebhookPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const eventName = getLemonSqueezyEventName(payload);

  try {
    await recordWebhookEvent({ eventName, payload, signature });

    if (isSupportedLemonSqueezyEvent(eventName)) {
      const subscriptionWrite = buildSubscriptionWrite(payload, eventName);

      if (subscriptionWrite) {
        await syncSubscription(subscriptionWrite);
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected webhook error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
