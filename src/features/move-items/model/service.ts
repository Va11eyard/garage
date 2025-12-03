import { Service, type MovementDocumentCreateRequest, type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'

export class MoveItemsService {
    async create(data: MovementDocumentCreateRequest): Promise<MovementDocumentDto> {
        return Service.createMovementDocument(data)
    }

    async get(id: string): Promise<MovementDocumentDto> {
        return Service.getMovementDocumentById(id)
    }

    async cancel(id: string): Promise<MovementDocumentDto> {
        return Service.cancelMovementDocument(id)
    }
}
