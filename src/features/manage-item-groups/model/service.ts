import {
    Service,
    type ItemGroupDto,
    type ItemGroupCreateRequest,
    type ItemGroupUpdateRequest,
} from '@/shared/api/generated/__swagger_client'

export class ItemGroupService {
    async listAll(): Promise<ItemGroupDto[]> {
        return Service.listItemGroups()
    }

    async listRootGroups(): Promise<ItemGroupDto[]> {
        return Service.listRootItemGroups()
    }

    async listByParent(parentId: string): Promise<ItemGroupDto[]> {
        return Service.listItemGroupsByParent(parentId)
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
            return Service.listItemGroupsByParent(params.parentId)
        }
        return Service.listItemGroups()
    }

    async get(id: string): Promise<ItemGroupDto> {
        return Service.getItemGroupById(id)
    }

    async create(data: ItemGroupCreateRequest): Promise<ItemGroupDto> {
        return Service.createItemGroup(data)
    }

    async update(id: string, data: ItemGroupUpdateRequest): Promise<ItemGroupDto> {
        return Service.updateItemGroup(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.deleteItemGroup(id)
    }
}
