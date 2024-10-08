import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "@/src/style/globals.css";
import { dir } from "i18next";
import { languages } from "../i18/settings";
import { Providers } from "./providers";

const nunuto = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  applicationName: "Flashcards",
  title: {
    default: "Laitner flashcards",
    template: "Laitner flashcards",
  },
  description: "Generated by ScripterUz",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang} dir={dir(lang)}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={nunuto.className}>
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
