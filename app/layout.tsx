import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: {
        template: '%s | АПК учёта ВИ',
        default: 'АПК учёта вещевого имущества',
    },
    description: 'Система учёта форменного и специального обмундирования',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru" suppressHydrationWarning>
        <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
        </html>
    )
}
