import { useQuery } from '@tanstack/react-query'
import { ProvisionNormService } from './service'

const service = new ProvisionNormService()

export function useNormsSearch(params: {
    organizationId?: string
    employeeCategory?: string
    season?: 'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON'
    search?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['provision-norms', 'search', params],
        queryFn: () => service.search(params),
    })
}
