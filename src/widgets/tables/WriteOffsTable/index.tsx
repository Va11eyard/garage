'use client'

import { useWriteOffs } from '@/features/manage-write-offs/model/useWriteOffs'
import { useDeleteWriteOff } from '@/features/manage-write-offs/model/useDeleteWriteOff'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { DatePicker } from '@/shared/ui/date-picker'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function WriteOffsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        warehouseId: '',
        dateFrom: '',
        dateTo: ''
    })
    const { data: warehousesData } = useWarehouses({ page: 0, size: 1000 })
    const { data, isLoading } = useWriteOffs({ 
        warehouseId: debouncedFilters.warehouseId || undefined,
        dateFrom: debouncedFilters.dateFrom || undefined,
        dateTo: debouncedFilters.dateTo || undefined,
        page, 
        size 
    })
    const deleteMutation = useDeleteWriteOff()
    const confirmDialog = useConfirmDialog()

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('writeOffs.deleteConfirm'),
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
                        <DatePicker
                            value={filters.dateFrom}
                            onChange={(date) => updateFilter('dateFrom', date)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('common.dateTo')}</label>
                        <DatePicker
                            value={filters.dateTo}
                            onChange={(date) => updateFilter('dateTo', date)}
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/inventory/writeoff/create">{t('writeOffs.createWriteOff')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('documents.documentNumber')}</TableHead>
                        <TableHead>{t('documents.documentDate')}</TableHead>
                        {!isMobile && <TableHead>{t('documents.statusLabel')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((doc: any) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.docNumber || '-'}</TableCell>
                            <TableCell>{doc.docDate ? new Date(doc.docDate).toLocaleDateString() : '-'}</TableCell>
                            {!isMobile && (
                                <TableCell>
                                    <span className={doc.status === 'DRAFT' ? 'text-gray-600' : doc.status === 'POSTED' ? 'text-green-600' : 'text-red-600'}>
                                        {doc.status ? t(`documents.${doc.status}`) : t('documents.DRAFT')}
                                    </span>
                                </TableCell>
                            )}
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/inventory/writeoff/${doc.id}` as Route}>
                                            {t('common.view')}
                                        </Link>
                                    </Button>
                                    {doc.status === 'DRAFT' && (
                                        <>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/inventory/writeoff/${doc.id}/edit` as Route}>
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
