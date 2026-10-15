import type { Metadata } from "next";
import { Inter, Playfair_Display, Quicksand } from "next/font/google";
import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { LocaleProvider } from "@/lib/i18n";
import { getLocale, getTranslations } from "@/lib/i18n/server";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("common.appName"),
    description: t("common.appTagline"),
  };
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  fallback: ["Trebuchet MS", "ui-sans-serif", "system-ui"],
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  fallback: ["Georgia", "Times New Roman"],
});

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored === "dark" || (stored !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${quicksand.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <div className="min-h-screen pb-24">
            <AppHeader />
            <main className="mx-auto max-w-3xl px-page-x py-8">{children}</main>
            <AppFooter />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
