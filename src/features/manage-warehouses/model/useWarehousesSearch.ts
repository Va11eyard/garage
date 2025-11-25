import { useQuery } from '@tanstack/react-query'
import { WarehouseService } from './service'

const service = new WarehouseService()

export function useWarehousesSearch(params: {
    code?: string
    name?: string
    orgId?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['warehouses', 'search', params],
        queryFn: () => service.search(params),
    })
}
