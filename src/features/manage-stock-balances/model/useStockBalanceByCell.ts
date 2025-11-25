import { useQuery } from '@tanstack/react-query'
import { StockBalanceApiService } from './service'

const service = new StockBalanceApiService()

export function useStockBalanceByCell(cellId: string | undefined) {
    return useQuery({
        queryKey: ['stock-balance', 'cell', cellId],
        queryFn: () => service.getByCell(cellId!),
        enabled: !!cellId,
    })
}
