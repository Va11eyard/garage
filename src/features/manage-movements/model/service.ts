import { Service, type MovementDocumentDto, type MovementDocumentCreateRequest, type MovementDocumentUpdateRequest, type Pageable } from '@/shared/api/generated/__swagger_client'

export class MovementService {
    async get(id: string): Promise<MovementDocumentDto> {
        return Service.getMovementDocumentById(id)
    }

    async create(data: MovementDocumentCreateRequest): Promise<MovementDocumentDto> {
        return Service.createMovementDocument(data)
    }

    async update(id: string, data: MovementDocumentUpdateRequest): Promise<MovementDocumentDto> {
        return Service.updateMovementDocument(id, data)
    }

    async delete(id: string): Promise<void> {
        return Service.deleteMovementDocument(id)
    }

    async post(id: string): Promise<MovementDocumentDto> {
        return Service.postMovementDocument(id)
    }

    async searchByToWarehouse(warehouseId: string, pageable: Pageable) {
        return Service.searchMovementDocumentsByToWarehouse(warehouseId, pageable)
    }

    async searchByFromWarehouse(warehouseId: string, pageable: Pageable) {
        return Service.searchMovementDocumentsByFromWarehouse(warehouseId, pageable)
    }
}
