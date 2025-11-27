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
        return Service.get13(id)
    }

    async create(data: WriteOffCreateRequest): Promise<WriteOffDocumentDto> {
        return Service.create16(data)
    }

    async update(id: string, data: WriteOffUpdateRequest): Promise<WriteOffDocumentDto> {
        return Service.update13(id, data)
    }

    async post(id: string): Promise<WriteOffDocumentDto> {
        return Service.post3(id)
    }

    async cancel(id: string): Promise<WriteOffDocumentDto> {
        return Service.cancel(id)
    }

    async delete(id: string): Promise<void> {
        return Service.delete13(id)
    }
}
