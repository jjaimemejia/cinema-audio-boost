import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support information for the pre-launch Cinema Audio Boost experience.",
  alternates: {
    canonical: "/support",
  },
};

export default function SupportPage() {
  return <SiteShell page="support" />;
}
