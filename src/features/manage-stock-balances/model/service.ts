import type { StockBalanceDto } from '@/shared/api/generated/__swagger_client'

export class StockBalanceApiService {
    async getByWarehouse(warehouseId: string): Promise<StockBalanceDto[]> {
        // TODO: Replace with actual API call when stock balance endpoints are available
        const response = await fetch(`/api/stock-balances/warehouse/${warehouseId}`)
        return response.json()
    }

    async getByCell(cellId: string): Promise<StockBalanceDto[]> {
        // TODO: Replace with actual API call when stock balance endpoints are available
        const response = await fetch(`/api/stock-balances/cell/${cellId}`)
        return response.json()
    }
}
