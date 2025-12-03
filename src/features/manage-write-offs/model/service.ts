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
        return Service.searchWriteOffDocumentsByWarehousePage(
            params.warehouseId,
            params.from,
            params.to,
            params.status,
            params.page,
            params.size,
        )
    }

    async get(id: string): Promise<WriteOffDocumentDto> {
        return Service.getWriteOffDocumentById(id)
    }

    async create(data: WriteOffCreateRequest): Promise<WriteOffDocumentDto> {
        return Service.createWriteOffDocument(data)
    }

    async update(id: string, data: WriteOffUpdateRequest): Promise<WriteOffDocumentDto> {
        return Service.updateWriteOffDocument(id, data)
    }

    async post(id: string): Promise<WriteOffDocumentDto> {
        return Service.postWriteOffDocument(id)
    }

    async cancel(id: string): Promise<WriteOffDocumentDto> {
        return Service.cancelWriteOffDocument(id)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteWriteOffDocument(id)
    }
}
