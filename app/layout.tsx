import './globals.css'
import type { Metadata } from 'next'
import { Mada } from 'next/font/google'

const font = Mada({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FamChat App',
  description: 'A chat application for families',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
