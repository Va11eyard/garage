export interface Device {
    id: string
    code: string
    name: string
    type: string
    warehouseId?: string | null
    warehouseName?: string | null
    status: 'ACTIVE' | 'INACTIVE' | 'ERROR'
    lastHeartbeat?: string | null
    lastError?: string | null
    registeredAt: string
}
