import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
// import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Providers from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Zunstore',
  description:
    'Find the best headphone blueetooth in a just one place, buy with Zunstore',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
