import { Service, type ItemGroupDto, type ItemGroupCreateRequest, type ItemGroupUpdateRequest } from '@/shared/api/generated/__swagger_client'

export class ItemGroupService {
    async listAll(): Promise<ItemGroupDto[]> {
        return Service.listAll()
    }

    async listRootGroups(): Promise<ItemGroupDto[]> {
        return Service.listRootGroups()
    }

    async listByParent(parentId: string): Promise<ItemGroupDto[]> {
        return Service.listByParent(parentId)
    }

    async get(id: string): Promise<ItemGroupDto> {
        return Service.get8(id)
    }

    async create(data: ItemGroupCreateRequest): Promise<ItemGroupDto> {
        return Service.create8(data)
    }

    async update(id: string, data: ItemGroupUpdateRequest): Promise<ItemGroupDto> {
        return Service.update8(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete8(id)
    }
}
