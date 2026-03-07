import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "كالكوايز | أدوات تداول احترافية",
  description: "منصة متطورة لأتمتة استراتيجيات التداول، مؤشرات ذكية، وتحليلات السوق بالذكاء الاصطناعي.",
};

import { AuthProvider } from "@/components/providers/SessionProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased`}>
        <GoogleAnalytics ga_id="G-CQ0F5LVG3J" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}



