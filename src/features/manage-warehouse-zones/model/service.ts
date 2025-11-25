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

    async search(params: {
        warehouseId?: string
        code?: string
        name?: string
        page?: number
        size?: number
    }) {
        return Service.search4(params.warehouseId, params.code, params.name, params.page, params.size)
    }

    async get(id: string): Promise<WarehouseZoneDto> {
        return Service.get1(id)
    }

    async create(data: WarehouseZoneCreateRequest): Promise<WarehouseZoneDto> {
        return Service.create2(data)
    }

    async update(id: string, data: WarehouseZoneUpdateRequest): Promise<WarehouseZoneDto> {
        return Service.update1(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete1(id)
    }
}
