import { Service, type QualityAcceptanceDocumentDto, type QualityAcceptanceCreateRequest, type QualityAcceptanceUpdateRequest, type PageQualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export class QualityAcceptanceService {
    async search(params: {
        warehouseId?: string
        from?: string
        to?: string
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
        page?: number
        size?: number
    }): Promise<PageQualityAcceptanceDocumentDto> {
        return Service.searchQualityAcceptanceDocumentsPage(
            params.warehouseId,
            params.from,
            params.to,
            params.status,
            undefined, // docNumber
            params.page?.toString(),
            params.size?.toString()
        )
    }

    async get(id: string): Promise<QualityAcceptanceDocumentDto> {
        return Service.getQualityAcceptanceDocumentById(id)
    }

    async create(data: QualityAcceptanceCreateRequest): Promise<QualityAcceptanceDocumentDto> {
        return Service.createQualityAcceptanceDocument(data)
    }

    async update(id: string, data: QualityAcceptanceUpdateRequest): Promise<QualityAcceptanceDocumentDto> {
        return Service.updateQualityAcceptanceDocument(id, data)
    }

    async post(id: string): Promise<QualityAcceptanceDocumentDto> {
        return Service.postQualityAcceptanceDocument(id)
    }

    async cancel(id: string): Promise<QualityAcceptanceDocumentDto> {
        return Service.cancelQualityAcceptanceDocument(id)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteQualityAcceptanceDocument(id)
    }
}
