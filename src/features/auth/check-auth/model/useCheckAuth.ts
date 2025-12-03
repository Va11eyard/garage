'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from './useCurrentUser'

export function useCheckAuth() {
    const router = useRouter()
    const { data: user, isLoading, error } = useCurrentUser()

    useEffect(() => {
        if (!isLoading && (error || !user)) {
            router.push('/login')
        }
    }, [user, isLoading, error, router])

    return { user, isLoading, isAuthenticated: !!user }
}
