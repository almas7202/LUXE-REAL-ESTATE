import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LUXE Realty — Find What Moves You',
  description: 'Premium real estate. Expert agents. Real guidance.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230a0a0f"/><text x="50" y="50" font-family="serif" font-size="45" font-weight="bold" fill="%23c9a96e" text-anchor="middle" dominant-baseline="middle">L</text><circle cx="85" cy="85" r="8" fill="%23c9a96e"/></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
