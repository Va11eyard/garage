import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IntegrationEndpointService } from './service'

const service = new IntegrationEndpointService()

export function useCreateIntegrationEndpoint() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: service.create.bind(service),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['integration-endpoints'] })
        },
    })
}
