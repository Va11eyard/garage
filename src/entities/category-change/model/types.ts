export interface CategoryChangeDocument {
    id: string
    documentNumber: string
    documentDate: string
    warehouseId: string
    warehouseName?: string
    status: 'DRAFT' | 'POSTED' | 'CANCELLED'
    description?: string | null
    lines: CategoryChangeLine[]
    createdAt: string
    updatedAt: string
}

export interface CategoryChangeLine {
    id: string
    itemId: string
    itemCode: string
    itemName: string
    fromCategoryId: string
    fromCategoryName: string
    toCategoryId: string
    toCategoryName: string
    quantity: number
}
