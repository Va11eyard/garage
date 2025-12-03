import { Service, type WarehouseDto, type WarehouseCreateRequest, type WarehouseUpdateRequest } from '@/shared/api/generated/__swagger_client'

export class WarehouseService {
    async listByOrganization(orgId: string): Promise<WarehouseDto[]> {
        return Service.listWarehousesByOrganization(orgId)
    }

    async list(): Promise<WarehouseDto[]> {
        return Service.listWarehousesByOrganization('')
    }

    async search(
        code?: string,
        name?: string,
        page?: number,
        size?: number
    ) {
        return Service.searchWarehousesPage(code, name, page, size)
    }

    async get(id: string): Promise<WarehouseDto> {
        return Service.getWarehouseById(id)
    }

    async create(data: WarehouseCreateRequest): Promise<WarehouseDto> {
        return Service.createWarehouse(data)
    }

    async update(id: string, data: WarehouseUpdateRequest): Promise<WarehouseDto> {
        return Service.updateWarehouse(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteWarehouse(id)
    }
}
