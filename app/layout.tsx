import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Epilogue, Geist_Mono } from "next/font/google";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
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
  metadataBase: new URL("https://bnd-lab-agency.com"),
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
    url: "https://bnd-lab-agency.com",
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

/**
 * Browser chrome follows the theme. Two entries rather than one so the phone's
 * status bar matches the page the visitor is actually seeing.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfe" },
    { media: "(prefers-color-scheme: dark)", color: "#080e24" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Marks that scripting is available, before first paint so there is no
          flash. Scroll-reveal styles hang off this class, which means the
          hidden-then-revealed state only ever applies when JavaScript can
          actually reveal it — without it every section renders visible.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `document.documentElement.classList.add("js");` +
              `try{var m=matchMedia("(prefers-color-scheme: dark)"),` +
              `a=function(e){document.documentElement.classList.toggle("dark",e.matches)};` +
              `a(m);m.addEventListener("change",a)}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${sourceSans3.variable} ${epilogue.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
