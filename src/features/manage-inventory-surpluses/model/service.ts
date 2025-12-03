import { 
    Service, 
    type InventorySurplusDocumentDto, 
    type InventorySurplusCreateRequest, 
    type InventorySurplusUpdateRequest,
    type PageInventorySurplusDocumentDto 
} from '@/shared/api/generated/__swagger_client'

export class InventorySurplusService {
    async search(params: {
        warehouseId?: string
        from?: string
        to?: string
        status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
        docNumber?: string
        page?: number
        size?: number
    }): Promise<PageInventorySurplusDocumentDto> {
        return Service.searchInventorySurplusDocumentsPage(
            params.warehouseId,
            params.from,
            params.to,
            params.status,
            params.docNumber,
            params.page,
            params.size
        )
    }

    async get(id: string): Promise<InventorySurplusDocumentDto> {
        return Service.getInventorySurplusDocumentById(id)
    }

    async create(data: InventorySurplusCreateRequest): Promise<InventorySurplusDocumentDto> {
        return Service.createInventorySurplusDocument(data)
    }

    async update(id: string, data: InventorySurplusUpdateRequest): Promise<InventorySurplusDocumentDto> {
        return Service.updateInventorySurplusDocument(id, data)
    }

    async post(id: string): Promise<InventorySurplusDocumentDto> {
        return Service.postInventorySurplusDocument(id)
    }

    async cancel(id: string): Promise<InventorySurplusDocumentDto> {
        return Service.cancelInventorySurplusDocument(id)
    }

    async remove(id: string): Promise<void> {
        return Service.deleteInventorySurplusDocument(id)
    }
}
