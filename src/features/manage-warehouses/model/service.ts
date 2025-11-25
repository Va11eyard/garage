import { Service, type WarehouseDto, type WarehouseCreateRequest, type WarehouseUpdateRequest } from '@/shared/api/generated/__swagger_client'

export class WarehouseService {
    async listByOrganization(orgId: string): Promise<WarehouseDto[]> {
        return Service.listByOrganization(orgId)
    }

    async search(params: {
        code?: string
        name?: string
        orgId?: string
        page?: number
        size?: number
    }) {
        return Service.search1(params.code, params.name, params.orgId, params.page, params.size)
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

    async remove(id: string): Promise<void> {
        return Service.delete(id)
    }
}
