import { useQuery } from '@tanstack/react-query'
import { StockBalanceApiService } from './service'

const service = new StockBalanceApiService()

export function useStockBalances(warehouseId?: string) {
    return useQuery({
        queryKey: ['stock-balances', warehouseId],
        queryFn: () => {
            if (warehouseId) {
                return service.getByWarehouse(warehouseId)
            }
            // When no warehouse is selected, return empty array
            // TODO: Implement getAll method when API is available
            return Promise.resolve([])
        },
    })
}
