import {
    Service,
    type CategoryChangeDocumentDto,
    type CategoryChangeDocumentCreateRequest,
    type PageCategoryChangeDocumentDto,
} from '@/shared/api/generated/__swagger_client'

export class CategoryChangeService {
    async create(data: CategoryChangeDocumentCreateRequest): Promise<CategoryChangeDocumentDto> {
        return Service.create(data)
    }

    async post(id: string): Promise<CategoryChangeDocumentDto> {
        return Service.post(id)
    }

    async search(params: {
        warehouseId?: string
        status?: string
        page?: number
        size?: number
    }): Promise<PageCategoryChangeDocumentDto> {
        return Service.search(params.warehouseId || '', params.status, params.page as any, params.size as any)
    }
}
