'use client'

import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZonesSearch } from '@/features/manage-warehouse-zones/model/useWarehouseZonesSearch'
import { useDeleteWarehouseZone } from '@/features/manage-warehouse-zones/model/useDeleteWarehouseZone'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { toast } from 'sonner'
import Link from 'next/link'
import { useState } from 'react'
import { Route } from 'next'

export function WarehouseZonesTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('')
    const { data: warehouses } = useWarehouses({ page: 0, size: 100 })
    const { data: zonesData, isLoading } = useWarehouseZonesSearch({ 
        warehouseId: selectedWarehouseId || undefined,
        page,
        size
    })
    const deleteMutation = useDeleteWarehouseZone()
    const confirmDialog = useConfirmDialog()

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('warehouseZones.deleteConfirm'),
            t('warehouseZones.deleteMessage') || 'Вы уверены, что хотите удалить эту зону склада?',
            () => {
                deleteMutation.mutate(id, {
                    onSuccess: () => toast.success(t('common.success')),
                    onError: () => toast.error(t('common.error')),
                })
            }
        )
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouseZones.warehouse')}</label>
                        <Select value={selectedWarehouseId || '__ALL__'} onValueChange={(value) => setSelectedWarehouseId(value === '__ALL__' ? '' : value)}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                                {warehouses?.content?.map((w: any) => (
                                    <SelectItem key={w.id} value={w.id!}>
                                        {w.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Link href="/directories/warehouse-zones/create">
                    <Button variant="default" className="shrink-0">{t('warehouseZones.createZone')}</Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('warehouseZones.code')}</TableHead>
                        <TableHead>{t('warehouseZones.name')}</TableHead>
                        <TableHead>{t('warehouseZones.warehouse')}</TableHead>
                        <TableHead>{t('warehouseZones.sortOrder')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {zonesData?.content?.map((zone: any) => (
                        <TableRow key={zone.id}>
                            <TableCell>{zone.code}</TableCell>
                            <TableCell>{zone.name}</TableCell>
                            <TableCell>{zone.warehouseName || '—'}</TableCell>
                            <TableCell>{zone.sortOrder}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/directories/warehouse-zones/${zone.id}/edit` as Route}>{t('common.edit')}</Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(zone.id!)}
                                >
                                    {t('common.delete')}
                                </Button>
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
                    {t('pagination.page')} {page + 1} {t('pagination.of')} {zonesData?.totalPages ?? 1}
                </span>
                <Button onClick={nextPage} disabled={zonesData?.last || page >= (zonesData?.totalPages ?? 1) - 1}>
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
