import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({

        {/* Google Tag (gtag.js) */ }
  < Script
          async
          src = "https://www.googletagmanager.com/gtag/js?id=G-CQ0F5LVG3J"
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
      </body >
    </html >
  );
}




