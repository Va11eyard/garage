import { Service, type ReturnCreateRequest, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

export class ReturnItemsService {
    async create(data: ReturnCreateRequest): Promise<ReturnDocumentDto> {
        return Service.createReturnDocument(data)
    }

    async get(id: string): Promise<ReturnDocumentDto> {
        return Service.getReturnDocumentById(id)
    }

    async cancel(id: string): Promise<ReturnDocumentDto> {
        return Service.cancelReturnDocument(id)
    }
}
