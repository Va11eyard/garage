import { useQuery } from '@tanstack/react-query'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useWarehouseCellsSearch(params: {
    warehouseId?: string
    warehouseIds?: string[]
    zoneId?: string
    zoneIds?: string[]
}) {
    return useQuery({
        queryKey: ['warehouse-cells', 'search', params],
        queryFn: async () => {
            if (params.zoneId) {
                return service.listByZone(params.zoneId)
            }
            if (params.zoneIds && params.zoneIds.length > 0) {
                return service.listByZones(params.zoneIds)
            }
            if (params.warehouseId) {
                return service.listByWarehouse(params.warehouseId)
            }
            if (params.warehouseIds && params.warehouseIds.length > 0) {
                return service.listByWarehouses(params.warehouseIds)
            }
            return []
        },
        enabled: !!(
            params.warehouseId || 
            (params.warehouseIds && params.warehouseIds.length > 0) ||
            params.zoneId ||
            (params.zoneIds && params.zoneIds.length > 0)
        ),
    })
}
