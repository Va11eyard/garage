export interface StockBalance {
    id: string
    warehouseId: string
    warehouseName?: string
    zoneId?: string | null
    zoneName?: string | null
    cellId?: string | null
    cellCode?: string | null
    itemId: string
    itemCode: string
    itemName: string
    quantity: number
    reservedQuantity: number
    availableQuantity: number
    qualityCategoryId?: string | null
    qualityCategoryName?: string | null
}
