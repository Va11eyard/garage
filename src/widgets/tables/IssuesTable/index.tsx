'use client'

import { useIssues } from '@/features/manage-issues/model/useIssues'
import { useDeleteIssue } from '@/features/manage-issues/model/useDeleteIssue'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'

export function IssuesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        warehouseId: '__ALL__',
        dateFrom: '',
        dateTo: ''
    })
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    const { data, isLoading } = useIssues({ 
        ...debouncedFilters, 
        warehouseId: debouncedFilters.warehouseId === '__ALL__' ? '' : debouncedFilters.warehouseId,
        page, 
        size 
    })
    const deleteMutation = useDeleteIssue()

    const handleDelete = (id: string) => {
        if (confirm(t('issues.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4 flex-wrap">
                <div className="flex gap-4 flex-1 flex-wrap">
                    <div className="min-w-[200px]">
                        <label className="block text-sm font-medium mb-1">{t('documents.warehouse')}</label>
                        <Select value={filters.warehouseId} onValueChange={(value) => updateFilter('warehouseId', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('warehouses.selectWarehouse')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                                {warehousesData?.content?.map((warehouse: any) => (
                                    <SelectItem key={warehouse.id} value={warehouse.id!}>
                                        {warehouse.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('common.dateFrom')}</label>
                        <Input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => updateFilter('dateFrom', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('common.dateTo')}</label>
                        <Input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => updateFilter('dateTo', e.target.value)}
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/inventory/issue/create">{t('issues.createIssue')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('documents.documentNumber')}</TableHead>
                        <TableHead>{t('documents.documentDate')}</TableHead>
                        {!isMobile && <TableHead>Статус</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((doc: any) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.documentNumber}</TableCell>
                            <TableCell>{new Date(doc.documentDate).toLocaleDateString()}</TableCell>
                            {!isMobile && (
                                <TableCell>
                                    <span className={`gov-badge gov-badge-${doc.status?.toLowerCase()}`}>
                                        {doc.status}
                                    </span>
                                </TableCell>
                            )}
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/inventory/issue/${doc.id}` as Route}>
                                            {t('common.view')}
                                        </Link>
                                    </Button>
                                    {doc.status === 'DRAFT' && (
                                        <>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/inventory/issue/${doc.id}/edit` as Route}>
                                                    {t('common.edit')}
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600"
                                                onClick={() => handleDelete(doc.id!)}
                                            >
                                                {t('common.delete')}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
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
