import type { Metadata } from 'next'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Zentro – The App Store for AI Agents',
  description: 'Browse production-ready AI agents, customize them with your business, and launch in minutes. No code. No developers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <Header />
        <main>{children}</main>
        <Script
          id="clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xcc6v2zjvn");
            `,
          }}
        />
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId="G-NNRP1KZ598" />
        )}
      </body>
    </html>
  )
}
