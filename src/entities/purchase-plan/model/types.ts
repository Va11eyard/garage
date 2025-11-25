export interface PurchasePlan {
    id: string
    code: string
    name: string
    description?: string | null
    status: 'DRAFT' | 'APPROVED' | 'SENT' | 'CLOSED'
    planDate: string
    organizationId: string
    items: PurchasePlanItem[]
    createdAt: string
    updatedAt: string
}

export interface PurchasePlanItem {
    id: string
    itemId: string
    itemCode: string
    itemName: string
    quantity: number
    estimatedPrice?: number | null
    priority?: string | null
    notes?: string | null
}
