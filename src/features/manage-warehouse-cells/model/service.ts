import {
    Service,
    type WarehouseCellDto,
    type WarehouseCellCreateRequest,
    type WarehouseCellUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

export class WarehouseCellService {
    async listByWarehouse(warehouseId: string): Promise<WarehouseCellDto[]> {
        return Service.listByWarehouse1(warehouseId)
    }

    async listByZone(zoneId: string): Promise<WarehouseCellDto[]> {
        return Service.listByZone(zoneId)
    }

    async search(params: {
        warehouseId?: string
        zoneId?: string
        code?: string
        page?: number
        size?: number
    }) {
        return Service.search5(params.warehouseId, params.zoneId, params.code, params.page, params.size)
    }

    async get(id: string): Promise<WarehouseCellDto> {
        return Service.get2(id)
    }

    async create(data: WarehouseCellCreateRequest): Promise<WarehouseCellDto> {
        return Service.create3(data)
    }

    async update(id: string, data: WarehouseCellUpdateRequest): Promise<WarehouseCellDto> {
        return Service.update2(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete2(id)
    }
}
