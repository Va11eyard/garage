'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { IntegrationEndpointService } from './service'

const service = new IntegrationEndpointService()

export function useCreateIntegrationEndpoint() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: service.create.bind(service),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['integration-endpoints'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['integration-endpoints'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['integrationEndpoints'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['integrationEndpoints'], exact: false })
            router.refresh()
        },
    })
}
