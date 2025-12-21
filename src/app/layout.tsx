import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Subrajit Pandey | Software Developer',
  description: 'Full-stack developer passionate about creating innovative solutions. Specializing in React, Node.js, and modern web technologies.',
  keywords: ['Subrajit Pandey', 'Software Developer', 'Full Stack Developer', 'React', 'Node.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Subrajit Pandey' }],
  creator: 'Subrajit Pandey',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://subrajitpandey.dev',
    title: 'Subrajit Pandey | Software Developer',
    description: 'Full-stack developer passionate about creating innovative solutions.',
    siteName: 'Subrajit Pandey Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subrajit Pandey | Software Developer',
    description: 'Full-stack developer passionate about creating innovative solutions.',
    creator: '@subrajitpandey',
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-navy-700 text-navy-300 antialiased`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}