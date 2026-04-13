import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cinema Audio Boost | Disponible pronto",
    template: "%s | Cinema Audio Boost",
  },
  description:
    "Pre-launch landing page for Cinema Audio Boost, a Chrome extension designed to enhance dialogue clarity, volume, and cinematic sound across streaming platforms.",
  openGraph: {
    title: "Cinema Audio Boost",
    description:
      "Hear every dialogue clearly while streaming with a cinematic pre-launch experience.",
    type: "website",
    siteName: "Cinema Audio Boost",
  },
};

export const viewport: Viewport = {
  themeColor: "#040814",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#040814] text-white">{children}</body>
    </html>
  );
}
