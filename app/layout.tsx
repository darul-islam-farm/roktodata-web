import type { Metadata } from 'next'
import { Anek_Bangla } from 'next/font/google'

import './globals.css'
import './component.css'

import Provider from '@/configs/Provider'
import { siteInfo } from '@/configs/site'

import { cn } from '@/lib/utils'
import ScrollToTop from '@/components/shared/ui/ScrollToTop'

const inter = Anek_Bangla({ subsets: ['bengali'] })

export const metadata: Metadata = {
  title: {
    default: siteInfo.name,
    template: `%s | ${siteInfo.name}`
  },
  description: siteInfo.description,
  authors: siteInfo.authors,
  generator: siteInfo.generator,
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({ children }: IChildren) {
  return (
    <html lang='en'>
      <body
        className={cn(
          inter.className,
          'bg-light dark:bg-darkbg text-dark dark:text-litetext'
        )}
      >
        <Provider>
          <main>
            {children}
            <ScrollToTop />
          </main>
        </Provider>
      </body>
    </html>
  )
}
