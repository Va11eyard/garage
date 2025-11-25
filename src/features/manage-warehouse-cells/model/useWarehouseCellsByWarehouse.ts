import { useQuery } from '@tanstack/react-query'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useWarehouseCellsByWarehouse(warehouseId: string | undefined) {
    return useQuery({
        queryKey: ['warehouse-cells', 'by-warehouse', warehouseId],
        queryFn: () => service.listByWarehouse(warehouseId!),
        enabled: !!warehouseId,
    })
}
