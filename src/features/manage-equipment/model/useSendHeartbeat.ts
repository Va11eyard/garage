'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useSendHeartbeat() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (code: string) => Service.sendDeviceHeartbeat(code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['equipment'], exact: false })
        },
    })
}
