'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useSendIntegrationEndpoint() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (code: string) => Service.sendTestIntegrationMessage(code, 'TEST'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['integration-endpoints'] })
        },
    })
}
