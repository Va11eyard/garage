export interface EmployeeProvisionCard {
    employeeId: string
    employeeName: string
    categoryId: string
    categoryName: string
    normId?: string | null
    normName?: string | null
    items: EmployeeProvisionItem[]
}

export interface EmployeeProvisionItem {
    itemId: string
    itemCode: string
    itemName: string
    normQuantity: number
    issuedQuantity: number
    remainingQuantity: number
    wearPeriodMonths?: number | null
    nextIssueDate?: string | null
    status: 'OK' | 'DUE' | 'OVERDUE'
}

export interface EmployeeProvisionReport {
    employeeId: string
    employeeName: string
    categoryId: string
    categoryName: string
    totalItems: number
    providedItems: number
    missingItems: number
    overdueItems: number
    provisionPercentage: number
    items: EmployeeProvisionItemStatus[]
}

export interface EmployeeProvisionItemStatus {
    itemId: string
    itemCode: string
    itemName: string
    required: boolean
    provided: boolean
    quantity: number
    normQuantity: number
    status: 'PROVIDED' | 'MISSING' | 'OVERDUE' | 'PARTIAL'
}
