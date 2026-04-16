import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://www.cinemaaudioboost.online"),
  title: {
    default: "Cinema Audio Boost | Disponible pronto",
    template: "%s | Cinema Audio Boost",
  },
  description:
    "Pre-launch landing page for Cinema Audio Boost, a Chrome extension designed to enhance dialogue clarity, volume, and cinematic sound across streaming platforms.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cinema Audio Boost",
    description:
      "Hear every dialogue clearly while streaming with a cinematic pre-launch experience.",
    type: "website",
    siteName: "Cinema Audio Boost",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinema Audio Boost",
    description:
      "Hear every dialogue clearly while streaming with a cinematic pre-launch experience.",
  },
  robots: {
    index: true,
    follow: true,
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G2ZT1W4ZR5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G2ZT1W4ZR5');
          `}
        </Script>
      </head>
      <body className="min-h-full bg-[#040814] text-white">{children}</body>
    </html>
  );
}
