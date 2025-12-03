import { Service, type ReceiptDocumentDto, type ReceiptCreateRequest, type ReceiptUpdateRequest, type PageReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export class ReceiptService {
    async search(
        warehouseId?: string,
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
        fromDate?: string,
        toDate?: string,
        page?: number,
        size?: number
    ): Promise<PageReceiptDocumentDto> {
        return Service.searchReceiptDocumentsPage(
            warehouseId,
            status,
            fromDate,
            toDate,
            page,
            size
        )
    }

    async get(id: string): Promise<ReceiptDocumentDto> {
        return Service.getReceiptDocumentById(id)
    }

    async create(data: ReceiptCreateRequest): Promise<ReceiptDocumentDto> {
        return Service.createReceiptDocument(data)
    }

    async update(id: string, data: ReceiptUpdateRequest): Promise<ReceiptDocumentDto> {
        return Service.updateReceiptDocument(id, data)
    }

    async post(id: string): Promise<ReceiptDocumentDto> {
        return Service.postReceiptDocument(id)
    }

    async unpost(id: string): Promise<ReceiptDocumentDto> {
        return Service.unpostReceiptDocument(id)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteReceiptDocument(id)
    }
}
