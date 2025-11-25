import { useQuery } from '@tanstack/react-query'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useWarehouseZonesSearch(params: {
    warehouseId?: string
    code?: string
    name?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['warehouse-zones', 'search', params],
        queryFn: () => service.search(params),
    })
}
