'use client'

import { useInventories } from '@/features/manage-inventories/model/useInventories'
import { useDeleteInventory } from '@/features/manage-inventories/model/useDeleteInventory'
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

export function InventoriesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        warehouseId: '',
        fromDate: '',
        toDate: '',
        status: undefined as 'DRAFT' | 'POSTED' | 'CANCELLED' | undefined
    })
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    const { data, isLoading } = useInventories({ ...debouncedFilters, page, size })
    const deleteMutation = useDeleteInventory()

    const handleDelete = (id: string) => {
        if (confirm('Удалить документ инвентаризации?')) {
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
                        <Select value={filters.warehouseId || 'ALL'} onValueChange={(value) => updateFilter('warehouseId', value === 'ALL' ? '' : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('warehouses.selectWarehouse')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">{t('common.all')}</SelectItem>
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
                            value={filters.fromDate}
                            onChange={(e) => updateFilter('fromDate', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('common.dateTo')}</label>
                        <Input
                            type="date"
                            value={filters.toDate}
                            onChange={(e) => updateFilter('toDate', e.target.value)}
                        />
                    </div>
                    <div className="min-w-[150px]">
                        <label className="block text-sm font-medium mb-1">{t('common.status')}</label>
                        <Select
                            value={filters.status || 'ALL'}
                            onValueChange={(value) => updateFilter('status', value === 'ALL' ? undefined : value as 'DRAFT' | 'POSTED' | 'CANCELLED')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">{t('common.all')}</SelectItem>
                                <SelectItem value="DRAFT">DRAFT</SelectItem>
                                <SelectItem value="POSTED">POSTED</SelectItem>
                                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/inventory/inventory-check/create">{t('documents.createDocument')}</Link>
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
                    {data?.content?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={isMobile ? 3 : 4} className="text-center py-8 text-muted-foreground">
                                {filters.warehouseId ? t('common.noData') : 'Выберите склад для просмотра документов'}
                            </TableCell>
                        </TableRow>
                    )}
                    {data?.content?.map((doc: any) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.docNumber}</TableCell>
                            <TableCell>{new Date(doc.docDate).toLocaleDateString()}</TableCell>
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
                                        <Link href={`/inventory/inventory-check/${doc.id}` as Route}>
                                            {t('common.view')}
                                        </Link>
                                    </Button>
                                    {doc.status === 'DRAFT' && (
                                        <>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/inventory/inventory-check/${doc.id}/edit` as Route}>
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
                <Button onClick={nextPage} disabled={data?.last}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
