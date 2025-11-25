export interface Warehouse {
    id: string
    organizationId: string
    orgUnitId?: string | null
    code: string
    name: string
    address?: string | null
    description?: string | null
    active: boolean
}

export interface WarehouseZone {
    id: string
    warehouseId: string
    code: string
    name: string
    sortOrder: number
    active: boolean
}

export interface WarehouseCell {
    id: string
    warehouseId: string
    zoneId?: string | null
    code: string
    description?: string | null
    capacity?: number | null
    active: boolean
}
