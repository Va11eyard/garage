import {
    Service,
    type ItemDto,
    type ItemCreateRequest,
    type ItemUpdateRequest,
    type PageItemDto,
} from '@/shared/api/generated/__swagger_client'

export class ItemService {
    async list(): Promise<ItemDto[]> {
        return Service.list3()
    }

    async search(params: {
        code?: string
        name?: string
        groupId?: string
        page?: number
        size?: number
    }): Promise<PageItemDto> {
        return Service.search3(params.code, params.name, params.groupId, params.page, params.size)
    }

    async get(id: string): Promise<ItemDto> {
        return Service.get7(id)
    }

    async create(data: ItemCreateRequest): Promise<ItemDto> {
        return Service.create7(data)
    }

    async update(id: string, data: ItemUpdateRequest): Promise<ItemDto> {
        return Service.update7(id, data)
    }

    async remove(id: string): Promise<void> {
        return Service.delete7(id)
    }
}
