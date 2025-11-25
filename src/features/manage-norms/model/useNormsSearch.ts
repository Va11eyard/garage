import { useQuery } from '@tanstack/react-query'
import { ProvisionNormService } from './service'

const service = new ProvisionNormService()

export function useNormsSearch(params: {
    code?: string
    name?: string
    categoryId?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['provision-norms', 'search', params],
        queryFn: () => service.search(params),
    })
}
