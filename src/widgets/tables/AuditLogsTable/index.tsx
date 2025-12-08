'use client'

import { useAuditLogs } from '@/features/manage-audit-logs/model/useAuditLogs'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { format } from 'date-fns'

export function AuditLogsTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        entityType: '',
        action: '',
        userId: '',
    })
    const { data, isLoading } = useAuditLogs({ ...debouncedFilters, page, size })

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <Input
                    placeholder={t('auditLog.filterByEntity')}
                    value={filters.entityType}
                    onChange={(e) => updateFilter('entityType', e.target.value)}
                    className="max-w-xs"
                />
                <Input
                    placeholder={t('auditLog.filterByAction')}
                    value={filters.action}
                    onChange={(e) => updateFilter('action', e.target.value)}
                    className="max-w-xs"
                />
                <Input
                    placeholder={t('auditLog.filterByUser')}
                    value={filters.userId}
                    onChange={(e) => updateFilter('userId', e.target.value)}
                    className="max-w-xs"
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('auditLog.timestamp')}</TableHead>
                        <TableHead>{t('auditLog.user')}</TableHead>
                        <TableHead>{t('auditLog.action')}</TableHead>
                        <TableHead>{t('auditLog.entityType')}</TableHead>
                        <TableHead>{t('auditLog.entityId')}</TableHead>
                        <TableHead>{t('auditLog.ipAddress')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((log: any) => {
                        const formatTimestamp = (timestamp: string | null | undefined) => {
                            if (!timestamp) return '—'
                            try {
                                const date = new Date(timestamp)
                                if (isNaN(date.getTime())) return '—'
                                return format(date, 'dd.MM.yyyy HH:mm:ss')
                            } catch {
                                return '—'
                            }
                        }

                        return (
                            <TableRow key={log.id}>
                                <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                                <TableCell>{log.username || log.userId || '—'}</TableCell>
                                <TableCell>{log.action || '—'}</TableCell>
                                <TableCell>{log.entityType || '—'}</TableCell>
                                <TableCell className="font-mono text-xs">{log.entityId || '—'}</TableCell>
                                <TableCell>{log.ipAddress || '—'}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={page === 0}>
                    {t('pagination.prev')}
                </Button>
                <span className="text-sm text-gov-text-secondary">
                    {t('pagination.page')} {page + 1} {t('pagination.of')} {data?.totalPages ?? 1}
                </span>
                <Button onClick={nextPage} disabled={data?.last || page >= (data?.totalPages ?? 1) - 1}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
