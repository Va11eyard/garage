import {
    Service,
    type PageAuditLogDto,
    type AdminSearchResultDto,
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
        return Service.adminSearchAuditLogs(
            params.userId,
            undefined, // username
            params.action,
            params.entityType,
            params.entityId,
            undefined, // from
            undefined, // to
            undefined, // text
            params.page,
            params.size
        )
    }

    async searchAuditLogs(params: {
        userId?: string
        username?: string
        action?: string
        entityType?: string
        entityId?: string
        from?: string
        to?: string
        text?: string
        page?: number
        size?: number
    }): Promise<PageAuditLogDto> {
        return Service.adminSearchAuditLogs(
            params.userId,
            params.username,
            params.action,
            params.entityType,
            params.entityId,
            params.from,
            params.to,
            params.text,
            params.page,
            params.size
        )
    }

    async globalSearch(query: string, limitPerType: number = 10): Promise<AdminSearchResultDto[]> {
        return Service.adminGlobalSearch(query, limitPerType)
    }
}
