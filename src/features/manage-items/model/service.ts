import {
    Service,
    type ItemDto,
    type ItemCreateRequest,
    type ItemUpdateRequest,
    type PageItemDto,
} from '@/shared/api/generated/__swagger_client'

export class ItemService {
    async list(): Promise<ItemDto[]> {
        return Service.listItems()
    }

    async search(params: {
        code?: string
        name?: string
        groupId?: string
        page?: number
        size?: number
    }): Promise<PageItemDto> {
        return Service.searchItemsPage(params.code, params.name, params.groupId, params.page, params.size)
    }

    async get(id: string): Promise<ItemDto> {
        return Service.getItemById(id)
    }

    async create(data: ItemCreateRequest): Promise<ItemDto> {
        return Service.createItem(data)
    }

    async update(id: string, data: ItemUpdateRequest): Promise<ItemDto> {
        return Service.updateItem(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteItem(id)
    }
}
