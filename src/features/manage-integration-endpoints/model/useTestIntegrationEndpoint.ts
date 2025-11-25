import { useMutation } from '@tanstack/react-query'
import { IntegrationEndpointService } from './service'

const service = new IntegrationEndpointService()

export function useTestIntegrationEndpoint() {
    return useMutation({
        mutationFn: (code: string) => service.test(code),
    })
}
