import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '0xNunana | Book Master',
  description: 'Redis powered book keeper',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`inter.className bg-[#c0e1f4] py-[40px] px-[20px]`}>{children}</body>
    </html>
  )
}
