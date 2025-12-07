import {
    Service,
    type WarehouseCellDto,
    type WarehouseCellCreateRequest,
    type WarehouseCellUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

export class WarehouseCellService {
    async listByWarehouse(warehouseId: string): Promise<WarehouseCellDto[]> {
        return Service.listWarehouseCellsByWarehouse(warehouseId)
    }

    async listByZone(zoneId: string): Promise<WarehouseCellDto[]> {
        return Service.listWarehouseCellsByZone(zoneId)
    }

    async listByWarehouses(warehouseIds: string[]): Promise<WarehouseCellDto[]> {
        // Fetch cells from all warehouses and combine them
        const promises = warehouseIds.map(id => Service.listWarehouseCellsByWarehouse(id))
        const results = await Promise.all(promises)
        return results.flat()
    }

    async listByZones(zoneIds: string[]): Promise<WarehouseCellDto[]> {
        // Fetch cells from all zones and combine them
        const promises = zoneIds.map(id => Service.listWarehouseCellsByZone(id))
        const results = await Promise.all(promises)
        return results.flat()
    }

    async get(id: string): Promise<WarehouseCellDto> {
        return Service.getWarehouseCellById(id)
    }

    async create(data: WarehouseCellCreateRequest): Promise<WarehouseCellDto> {
        return Service.createWarehouseCell(data)
    }

    async update(id: string, data: WarehouseCellUpdateRequest): Promise<WarehouseCellDto> {
        return Service.updateWarehouseCell(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteWarehouseCell(id)
    }
}
