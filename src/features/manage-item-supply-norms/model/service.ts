import {
    Service,
    type ItemSupplyNormDto,
    type ItemSupplyNormCreateRequest,
    type ItemSupplyNormUpdateRequest,
    type PageItemSupplyNormDto,
} from '@/shared/api/generated/__swagger_client'

export class ItemSupplyNormService {
    async search(params: {
        employeeCategoryId?: string
        itemId?: string
        page?: number
        size?: number
    }): Promise<PageItemSupplyNormDto> {
        return Service.searchItemSupplyNormsPage(
            params.employeeCategoryId,
            params.itemId,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<ItemSupplyNormDto> {
        return Service.getItemSupplyNormById(id)
    }

    async create(data: ItemSupplyNormCreateRequest): Promise<ItemSupplyNormDto> {
        return Service.createItemSupplyNorm(data)
    }

    async update(id: string, data: ItemSupplyNormUpdateRequest): Promise<ItemSupplyNormDto> {
        return Service.updateItemSupplyNorm(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteItemSupplyNorm(id)
    }
}
