import { useQuery } from '@tanstack/react-query'
import { IntegrationEndpointService } from './service'

const service = new IntegrationEndpointService()

export function useIntegrationEndpoints() {
    return useQuery({
        queryKey: ['integration-endpoints'],
        queryFn: () => service.list(),
    })
}
