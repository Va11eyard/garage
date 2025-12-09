'use client'

import { useReceipts } from '@/features/manage-receipts/model/useReceipts'
import { useDeleteReceipt } from '@/features/manage-receipts/model/useDeleteReceipt'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ReceiptsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ documentNumber: '', warehouseId: '' })
    const { data, isLoading } = useReceipts({ ...debouncedFilters, page, size })
    const deleteMutation = useDeleteReceipt()
    const confirmDialog = useConfirmDialog()

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('receipts.deleteConfirm'),
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
            <div className="flex justify-between items-end gap-4 mb-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('documents.documentNumber')}</label>
                        <Input
                            placeholder={t('documents.documentNumber')}
                            value={filters.documentNumber}
                            onChange={(e) => updateFilter('documentNumber', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/inventory/receipts/create">{t('receipts.createReceipt')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('documents.documentNumber')}</TableHead>
                        <TableHead>{t('documents.documentDate')}</TableHead>
                        {!isMobile && <TableHead>{t('documents.warehouse')}</TableHead>}
                        <TableHead>{t('documents.statusLabel')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((doc: any) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.docNumber || '-'}</TableCell>
                            <TableCell>{doc.docDate ? new Date(doc.docDate).toLocaleDateString() : '-'}</TableCell>
                            {!isMobile && <TableCell>{doc.warehouseName || '-'}</TableCell>}
                            <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    doc.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                                    doc.status === 'POSTED' ? 'bg-green-100 text-green-800' :
                                    doc.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {doc.status ? t(`documents.${doc.status}`) : t('documents.DRAFT')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link href={`/inventory/receipts/${doc.id}`}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.view')}
                                    </Button>
                                </Link>
                                {doc.status === 'DRAFT' && (
                                    <>
                                        <Link href={`/inventory/receipts/${doc.id}/edit`}>
                                            <Button variant="ghost" size="sm">
                                                {t('common.edit')}
                                            </Button>
                                        </Link>
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
