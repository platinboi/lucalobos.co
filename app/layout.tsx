import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Banner } from '@/components/ui/banner'
import ScrollHandler from '@/components/scroll-handler'
import { ThemeProvider } from '@/components/theme-provider'
import { VoiceAssistantWrapper } from '@/components/voice-assistant-wrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <ScrollHandler>
              <Banner 
                id="portfolio-banner"
                variant="rainbow"
                height="3.5rem"
                className="font-medium text-base tracking-tight backdrop-blur-sm border-b border-border/10 text-foreground/90 shadow-sm z-50"
                message="🚀 Can you feel it? This is the start of something new!"
              />
              <Header />
              {children}
              <Footer />
              <VoiceAssistantWrapper />
            </ScrollHandler>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}