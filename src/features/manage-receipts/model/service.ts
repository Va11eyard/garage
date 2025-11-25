import { Service, type ReceiptDocumentDto, type ReceiptCreateRequest, type ReceiptUpdateRequest, type PageReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export class ReceiptService {
    async search(params: {
        warehouseId?: string
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
        fromDate?: string
        toDate?: string
        page?: number
        size?: number
    }): Promise<PageReceiptDocumentDto> {
        return Service.search6(
            params.warehouseId,
            params.status,
            params.fromDate,
            params.toDate,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<ReceiptDocumentDto> {
        return Service.get14(id)
    }

    async create(data: ReceiptCreateRequest): Promise<ReceiptDocumentDto> {
        return Service.create14(data)
    }

    async update(id: string, data: ReceiptUpdateRequest): Promise<ReceiptDocumentDto> {
        return Service.update14(id, data)
    }

    async post(id: string): Promise<ReceiptDocumentDto> {
        return Service.post4(id)
    }

    async unpost(id: string): Promise<ReceiptDocumentDto> {
        return Service.unpost(id)
    }

    async remove(id: string): Promise<void> {
        return Service.delete14(id)
    }
}
