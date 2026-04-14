import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscriptionStatusRow = {
  email?: string | null;
  is_pro?: boolean | null;
  status?: string | null;
  variant_name?: string | null;
  product_name?: string | null;
  ends_at?: string | null;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase() ?? "";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .ilike("email", email)
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const subscription = (data ?? null) as SubscriptionStatusRow | null;

  return NextResponse.json({
    email,
    isPro: Boolean(subscription?.is_pro),
    status: subscription?.status ?? null,
    variantName: subscription?.variant_name ?? null,
    productName: subscription?.product_name ?? null,
    endsAt: subscription?.ends_at ?? null,
  });
}
