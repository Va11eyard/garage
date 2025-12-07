'use client'

import { useReturnsSearch } from '@/features/manage-returns/model/useReturnsSearch'
import { useDeleteReturn } from '@/features/manage-returns/model/useDeleteReturn'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { GovDatePicker } from '@/gov-design'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ReturnsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        warehouseId: '',
        from: '',
        to: ''
    })
    const { data: warehousesData } = useWarehouses({ page: 0, size: 1000 })
    const { data, isLoading } = useReturnsSearch({ 
        warehouseId: debouncedFilters.warehouseId || undefined,
        from: debouncedFilters.from || undefined,
        to: debouncedFilters.to || undefined,
        page, 
        size 
    })
    const deleteMutation = useDeleteReturn()
    const confirmDialog = useConfirmDialog()

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('returns.deleteConfirm'),
            t('common.confirmDelete') || 'Вы уверены, что хотите удалить этот документ?',
            () => {
                deleteMutation.mutate(id, {
                    onSuccess: () => toast.success(t('common.success')),
                    onError: (error: any) => toast.error(getErrorMessage(error)),
                })
            }
        )
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4 flex-wrap">
                <div className="flex gap-4 flex-1 flex-wrap">
                    <div className="min-w-[200px]">
                        <label className="block text-sm font-medium mb-1">{t('documents.warehouse')}</label>
                        <Select value={filters.warehouseId || undefined} onValueChange={(value) => updateFilter('warehouseId', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('warehouses.selectWarehouse')} />
                            </SelectTrigger>
                            <SelectContent>
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
                        <GovDatePicker
                            value={filters.from}
                            onChange={(date) => updateFilter('from', date)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('common.dateTo')}</label>
                        <GovDatePicker
                            value={filters.to}
                            onChange={(date) => updateFilter('to', date)}
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/inventory/return/create">{t('returns.createReturn')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('documents.documentNumber')}</TableHead>
                        <TableHead>{t('documents.documentDate')}</TableHead>
                        {!isMobile && <TableHead>{t('documents.status')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((doc: any) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.docNumber}</TableCell>
                            <TableCell>{doc.docDate ? new Date(doc.docDate).toLocaleDateString() : '-'}</TableCell>
                            {!isMobile && (
                                <TableCell>
                                    <span className={doc.status === 'DRAFT' ? 'text-gray-600' : doc.status === 'POSTED' ? 'text-green-600' : 'text-red-600'}>
                                        {t(`documents.${doc.status}`)}
                                    </span>
                                </TableCell>
                            )}
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/inventory/return/${doc.id}` as Route}>
                                            {t('common.view')}
                                        </Link>
                                    </Button>
                                    {doc.status === 'DRAFT' && (
                                        <>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/inventory/return/${doc.id}/edit` as Route}>
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

            <GovConfirmModal
                isOpen={confirmDialog.isOpen}
                onClose={confirmDialog.hideConfirm}
                onConfirm={confirmDialog.handleConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmText={t('common.delete')}
                cancelText={t('common.cancel')}
                variant="danger"
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
