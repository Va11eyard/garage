import {
    Service,
    type ItemGroupDto,
    type ItemGroupCreateRequest,
    type ItemGroupUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

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

    async search(params: {
        code?: string
        name?: string
        parentId?: string
        page?: number
        size?: number
    }) {
        // No paginated search endpoint for item-groups - use list methods
        if (params.parentId) {
            return Service.listByParent(params.parentId)
        }
        return Service.listAll()
    }

    async get(id: string): Promise<ItemGroupDto> {
        return Service.get9(id)
    }

    async create(data: ItemGroupCreateRequest): Promise<ItemGroupDto> {
        return Service.create10(data)
    }

    async update(id: string, data: ItemGroupUpdateRequest): Promise<ItemGroupDto> {
        return Service.update9(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete9(id)
    }
}
