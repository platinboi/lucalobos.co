import { Inter, Crimson_Pro } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Banner } from '@/components/ui/banner'
import ScrollHandler from '@/components/scroll-handler'
import { ThemeProvider } from '@/components/theme-provider'
import InitialLoader from '@/components/initial-loader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'Luca Lo Bosco | Full-Stack Developer & AI Solutions',
  description: 'Luca Lo Bosco - Business Automation Specialist, AI Developer, and Full-Stack Web Developer helping businesses build better digital solutions.',
  generator: 'Next.js',
  applicationName: 'Luca Lo Bosco Portfolio',
  keywords: ['developer', 'AI', 'automation', 'full-stack', 'web development', 'portfolio', 'custom solutions'],
  authors: [{ name: 'Luca Lo Bosco' }],
  creator: 'Luca Lo Bosco',
  publisher: 'Luca Lo Bosco',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lucalobos.co'),
  openGraph: {
    title: 'Luca Lo Bosco | Full-Stack Developer & AI Solutions',
    description: 'Business Automation Specialist, AI Developer, and Full-Stack Web Developer helping businesses build better digital solutions.',
    url: 'https://lucalobos.co',
    siteName: 'Luca Lo Bosco Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luca Lo Bosco | Full-Stack Developer & AI Solutions',
    description: 'Business Automation Specialist, AI Developer, and Full-Stack Web Developer helping businesses build better digital solutions.',
    creator: '@lucalobosco',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} ${crimsonPro.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <InitialLoader />
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <ScrollHandler>
              <Banner 
                id="portfolio-banner"
                variant="rainbow"
                height="3.5rem"
                className="font-medium text-base tracking-tight backdrop-blur-sm border-b border-border/10 text-foreground/90 shadow-sm z-50"
                message="🚀 The future won't come until we build it!"
              />
              <Header />
              {children}
              <Footer />
            </ScrollHandler>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}