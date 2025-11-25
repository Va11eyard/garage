import {
    Service,
    type PageAuditLogDto,
} from '@/shared/api/generated/__swagger_client'

export class AuditLogService {
    async search(params: {
        entityType?: string
        entityId?: string
        userId?: string
        action?: string
        page?: number
        size?: number
    }): Promise<PageAuditLogDto> {
        return Service.search(
            params.entityType,
            params.entityId,
            params.userId,
            params.action,
            params.page,
            params.size
        )
    }
}
