'use client'

import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { MobileNav } from './MobileNav'
import { useMobile } from '@/shared/hooks/use-mobile'
import React from 'react'

export function MainLayout({ children }: { children: React.ReactNode }) {
    const { isMobile } = useMobile()

    return (
        <div className="min-h-screen flex flex-col bg-gov-gray-50">
            <Header />
            {isMobile && <MobileNav />}
            <div className="flex flex-1">
                {!isMobile && <Sidebar />}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}
