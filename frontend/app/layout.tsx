import type { Metadata } from "next";
import { Lora, Be_Vietnam_Pro } from "next/font/google";
import { Chatbot } from "@/components/chat/Chatbot";
import "./globals.scss";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nora-halo-one.vercel.app",
  ),
  title: {
    default: "NORA Halo One | Intelligent Cat Care Station",
    template: "%s | NORA Halo One",
  },
  description:
    "A concept product landing page for NORA Halo One, an intelligent cat care station built for cleaner routines and calmer homes.",
  keywords: [
    "NORA Halo One",
    "intelligent cat care station",
    "pet tech landing page",
    "smart cat litter concept",
  ],
  authors: [{ name: "Nguyen Van Minh Hai" }],
  creator: "Nguyen Van Minh Hai",
  openGraph: {
    title: "NORA Halo One | Intelligent Cat Care Station",
    description:
      "Cleaner routines. Calmer homes. Explore a fictional smart cat care station concept built for a technical assessment.",
    url: "/",
    siteName: "NORA Halo One",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/nora-halo-one-hero.webp",
        width: 1710,
        height: 966,
        alt: "NORA Halo One concept smart cat care station in a modern home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NORA Halo One",
    description:
      "An original concept product experience for a smart cat care station.",
    images: ["/images/nora-halo-one-hero.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${lora.variable} ${beVietnam.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-page font-sans text-ink antialiased">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
