import { StockBalanceService, type StockBalanceDto } from '@/shared/api/generated/__swagger_client'

export class StockBalanceApiService {
    async getByWarehouse(warehouseId: string): Promise<StockBalanceDto[]> {
        return StockBalanceService.getByWarehouse(warehouseId)
    }

    async getByCell(cellId: string): Promise<StockBalanceDto[]> {
        return StockBalanceService.getByCell(cellId)
    }
}
