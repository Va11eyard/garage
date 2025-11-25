import { useQuery } from '@tanstack/react-query'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useWarehouseZonesByWarehouse(warehouseId: string | undefined) {
    return useQuery({
        queryKey: ['warehouse-zones', 'by-warehouse', warehouseId],
        queryFn: () => service.listByWarehouse(warehouseId!),
        enabled: !!warehouseId,
    })
}
