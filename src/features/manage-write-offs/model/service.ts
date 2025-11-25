import {
    Service,
    type WriteOffDocumentDto,
    type WriteOffCreateRequest,
    type WriteOffUpdateRequest,
    type PageWriteOffDocumentDto,
} from '@/shared/api/generated/__swagger_client'

export class WriteOffService {
    async searchByWarehouse(params: {
        warehouseId: string
        from?: string
        to?: string
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
        page?: number
        size?: number
    }): Promise<PageWriteOffDocumentDto> {
        return Service.searchByWarehouse(
            params.warehouseId,
            params.from,
            params.to,
            params.status,
            params.page,
            params.size,
        )
    }

    async get(id: string): Promise<WriteOffDocumentDto> {
        return Service.get10(id)
    }

    async create(data: WriteOffCreateRequest): Promise<WriteOffDocumentDto> {
        return Service.create10(data)
    }

    async update(id: string, data: WriteOffUpdateRequest): Promise<WriteOffDocumentDto> {
        return Service.update10(id, data)
    }

    async post(id: string): Promise<WriteOffDocumentDto> {
        return Service.post(id)
    }

    async cancel(id: string): Promise<WriteOffDocumentDto> {
        return Service.cancel(id)
    }

    async remove(id: string): Promise<void> {
        return Service.delete10(id)
    }
}
