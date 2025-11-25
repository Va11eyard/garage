import { useQuery } from '@tanstack/react-query'
import { AuditLogService } from './service'

const service = new AuditLogService()

export function useAuditLogs(params: {
    entityType?: string
    entityId?: string
    userId?: string
    action?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['audit-logs', params],
        queryFn: () => service.search(params),
    })
}
