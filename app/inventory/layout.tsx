import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { MainLayout } from '@/widgets/layouts/MainLayout'
import React from 'react'

export default async function InventoryLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')

    if (!authToken) {
        redirect('/login')
    }

    return <MainLayout>{children}</MainLayout>
}
