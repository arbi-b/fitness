import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'EvidenceFit — Fitness Blog',
  description: 'Evidence-based fitness: studies, programs, and practical tips.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
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

      <body className="overflow-x-hidden">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}