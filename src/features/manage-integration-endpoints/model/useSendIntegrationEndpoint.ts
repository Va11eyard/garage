'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useSendIntegrationEndpoint() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (code: string) => Service.sendTestIntegrationMessage(code, 'TEST'),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['integration-endpoints'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['integration-endpoints'], exact: false })
            router.refresh()
        },
    })
}
