import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy information for the pre-launch Cinema Audio Boost experience.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <SiteShell page="privacy" />;
}
