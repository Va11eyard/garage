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
        return Service.search16(
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
        return Service.get21(id)
    }

    async create(data: InventorySurplusCreateRequest): Promise<InventorySurplusDocumentDto> {
        return Service.create24(data)
    }

    async update(id: string, data: InventorySurplusUpdateRequest): Promise<InventorySurplusDocumentDto> {
        return Service.update21(id, data)
    }

    async post(id: string): Promise<InventorySurplusDocumentDto> {
        return Service.post11(id)
    }

    async cancel(id: string): Promise<InventorySurplusDocumentDto> {
        return Service.cancel7(id)
    }

    async remove(id: string): Promise<void> {
        return Service.delete21(id)
    }
}
