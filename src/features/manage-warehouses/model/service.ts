import { Service, type WarehouseDto, type WarehouseCreateRequest, type WarehouseUpdateRequest } from '@/shared/api/generated/__swagger_client'

export class WarehouseService {
    async listByOrganization(orgId: string): Promise<WarehouseDto[]> {
        return Service.listByOrganization(orgId)
    }

    async list(): Promise<WarehouseDto[]> {
        return Service.list()
    }

    async search(
        code?: string,
        name?: string,
        page?: number,
        size?: number
    ) {
        return Service.search1(code, name, page, size)
    }

    async get(id: string): Promise<WarehouseDto> {
        return Service.get(id)
    }

    async create(data: WarehouseCreateRequest): Promise<WarehouseDto> {
        return Service.create1(data)
    }

    async update(id: string, data: WarehouseUpdateRequest): Promise<WarehouseDto> {
        return Service.update(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.delete(id)
    }
}
