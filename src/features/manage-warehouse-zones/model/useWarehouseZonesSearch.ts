import { useQuery } from '@tanstack/react-query'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useWarehouseZonesSearch(params: {
    warehouseId?: string
    warehouseIds?: string[]
    code?: string
    name?: string
}) {
    return useQuery({
        queryKey: ['warehouse-zones', 'search', params],
        queryFn: async () => {
            if (params.warehouseId) {
                return service.listByWarehouse(params.warehouseId)
            }
            if (params.warehouseIds && params.warehouseIds.length > 0) {
                return service.listByWarehouses(params.warehouseIds)
            }
            return []
        },
        enabled: !!(params.warehouseId || (params.warehouseIds && params.warehouseIds.length > 0)),
    })
}
