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
        return Service.search14(
            warehouseId,
            status,
            fromDate,
            toDate,
            page,
            size
        )
    }

    async get(id: string): Promise<ReceiptDocumentDto> {
        return Service.get17(id)
    }

    async create(data: ReceiptCreateRequest): Promise<ReceiptDocumentDto> {
        return Service.create20(data)
    }

    async update(id: string, data: ReceiptUpdateRequest): Promise<ReceiptDocumentDto> {
        return Service.update17(id, data)
    }

    async post(id: string): Promise<ReceiptDocumentDto> {
        return Service.post7(id)
    }

    async unpost(id: string): Promise<ReceiptDocumentDto> {
        return Service.unpost(id)
    }

    async delete(id: string): Promise<void> {
        return Service.delete17(id)
    }
}
