import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from '../providers/app-provider'
import { OnboardingProvider } from '../contexts/onboarding-context'
import { PulseProvider } from '../providers/pulse-provider'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pitch-it | Your AI-Powered Pitch Deck Builder',
  description: 'Validate your business ideas and perfect your pitch with AI-generated insights and virtual VC feedback.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <PulseProvider>
            <OnboardingProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </OnboardingProvider>
          </PulseProvider>
        </AppProvider>
      </body>
    </html>
  )
}
