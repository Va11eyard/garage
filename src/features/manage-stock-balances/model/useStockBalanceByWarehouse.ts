import { useQuery } from '@tanstack/react-query'
import { StockBalanceApiService } from './service'

const service = new StockBalanceApiService()

export function useStockBalanceByWarehouse(warehouseId: string | undefined) {
    return useQuery({
        queryKey: ['stock-balance', 'warehouse', warehouseId],
        queryFn: () => service.getByWarehouse(warehouseId!),
        enabled: !!warehouseId,
    })
}
