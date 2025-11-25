export interface AuditLog {
    id: string
    timestamp: string
    userId: string
    username?: string
    action: string
    entityType: string
    entityId: string
    oldValue?: string | null
    newValue?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    description?: string | null
}
