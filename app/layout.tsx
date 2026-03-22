import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Manrope, DM_Serif_Display } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import CookieBanner from '@/components/cookie-banner';

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon-16x16.png" },
    ],
  }, 
  title: 'MuscleLogic-Fitness Blog',
  description: 'Evidence-based fitness: studies, programs, and practical tips.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} scroll-smooth`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8427240368416109" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8427240368416109"
          crossOrigin="anonymous"
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XWCNGEWRQN"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XWCNGEWRQN');
          `}
        </Script>

      </head>

      <body className="font-sans overflow-x-hidden">
        <CookieBanner />
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}