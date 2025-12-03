import {
    Service,
    type InventoryDocumentDto,
    type InventoryDocumentCreateRequest,
    type InventoryDocumentUpdateRequest,
    type Pageable,
} from '@/shared/api/generated/__swagger_client'

export class InventoryService {
    async searchByWarehouse(warehouseId: string, pageable: Pageable) {
        return Service.searchInventoryDocumentsByWarehouse(warehouseId, pageable)
    }

    async get(id: string): Promise<InventoryDocumentDto> {
        return Service.getInventoryDocumentById(id)
    }

    async create(data: InventoryDocumentCreateRequest): Promise<InventoryDocumentDto> {
        return Service.createInventoryDocument(data)
    }

    async update(id: string, data: InventoryDocumentUpdateRequest): Promise<InventoryDocumentDto> {
        return Service.updateInventoryDocument(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteInventoryDocument(id)
    }

    async post(id: string): Promise<InventoryDocumentDto> {
        return Service.postInventoryDocument(id)
    }

    async cancel(id: string): Promise<InventoryDocumentDto> {
        return Service.cancelInventoryDocument(id)
    }
}
