import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bndlabs.com"),
  title: {
    default: "BND Labs | Growth Systems Architects",
    template: "%s | BND Labs",
  },
  description:
    "BND Labs helps established Zambian businesses generate consistent, predictable leads through digital infrastructure — not freelancer work.",
  keywords: [
    "lead generation Zambia",
    "digital marketing agency Lusaka",
    "growth systems",
    "digital strategy Zambia",
    "BND Labs",
    "lead generation systems",
  ],
  authors: [{ name: "BND Labs" }],
  creator: "BND Labs",
  openGraph: {
    type: "website",
    locale: "en_ZM",
    url: "https://bndlabs.com",
    siteName: "BND Labs",
    title: "BND Labs | Growth Systems Architects",
    description:
      "We help established Zambian businesses generate consistent, predictable leads through digital systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BND Labs | Growth Systems Architects",
    description:
      "We help established Zambian businesses generate consistent, predictable leads through digital systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
