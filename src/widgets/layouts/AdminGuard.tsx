'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/shared/ui/spinner'

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)
    const [hasAccess, setHasAccess] = useState(false)

    useEffect(() => {
        const checkAccess = () => {
            const rolesStr = localStorage.getItem('user_roles')
            
            try {
                const roles = rolesStr ? JSON.parse(rolesStr) : []
                if (!roles.includes('ADMIN')) {
                    // Redirect non-admin users to dashboard
                    router.replace('/dashboard')
                    return
                }
                setHasAccess(true)
            } catch (error) {
                console.error('Error checking admin access:', error)
                router.replace('/dashboard')
            } finally {
                setIsChecking(false)
            }
        }

        checkAccess()
    }, [router])

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Spinner />
                    <p className="mt-4 text-gov-gray-600">Проверка доступа...</p>
                </div>
            </div>
        )
    }

    if (!hasAccess) {
        return null
    }

    return <>{children}</>
}
