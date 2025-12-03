'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLogout() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, void>({
        mutationFn: async () => {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_roles')
            localStorage.removeItem('username')
        },
        onSuccess: () => {
            queryClient.clear()
            router.push('/login')
        },
    })
}
