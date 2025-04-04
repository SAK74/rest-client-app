import type { Metadata } from "next";
import "@/app/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Rest-client",
  description: "Rest-client-app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const session = await auth();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
          <NextIntlClientProvider>
            <SessionProvider session={session}>
              <Header />
              <main className="min-h-screen">{children}</main>
            </SessionProvider>
          </NextIntlClientProvider>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
