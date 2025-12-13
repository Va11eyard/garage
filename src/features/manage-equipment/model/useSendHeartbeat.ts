'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useSendHeartbeat() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (code: string) => Service.sendDeviceHeartbeat(code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['equipment'], exact: false })
            router.refresh()
        },
    })
}
