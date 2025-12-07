import {
    Service,
    type WarehouseZoneDto,
    type WarehouseZoneCreateRequest,
    type WarehouseZoneUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

export class WarehouseZoneService {
    async listByWarehouse(warehouseId: string): Promise<WarehouseZoneDto[]> {
        return Service.listByWarehouse(warehouseId)
    }

    async listByWarehouses(warehouseIds: string[]): Promise<WarehouseZoneDto[]> {
        // Fetch zones from all warehouses and combine them
        const promises = warehouseIds.map(id => Service.listByWarehouse(id))
        const results = await Promise.all(promises)
        return results.flat()
    }

    async get(id: string): Promise<WarehouseZoneDto> {
        return Service.get(id)
    }

    async create(data: WarehouseZoneCreateRequest): Promise<WarehouseZoneDto> {
        return Service.create1(data)
    }

    async update(id: string, data: WarehouseZoneUpdateRequest): Promise<WarehouseZoneDto> {
        return Service.update(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.delete(id)
    }
}
