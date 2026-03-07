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
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased`}>
        {/* Google Tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CQ0F5LVG3J"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CQ0F5LVG3J');
          `}
        </Script>

        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}




