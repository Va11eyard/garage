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
import { getErrorMessage } from '@/shared/utils/error-handler'
import { Route } from 'next'

export function WarehouseZonesTable() {
    const { t } = useTranslation()
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('__ALL__')
    const { data: warehouses } = useWarehouses({ page: 0, size: 100 })
    
    // Get all warehouse IDs for "All" filter
    const warehouseIds = warehouses?.content?.map((w: any) => w.id).filter(Boolean) || []
    
    // Create warehouse ID to name map
    const warehouseMap = new Map(
        warehouses?.content?.map((w: any) => [w.id, w.name]) || []
    )
    
    const { data: zones, isLoading } = useWarehouseZonesSearch({ 
        warehouseId: selectedWarehouseId !== '__ALL__' ? selectedWarehouseId : undefined,
        warehouseIds: selectedWarehouseId === '__ALL__' ? warehouseIds : undefined,
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
                    onError: (error: any) => toast.error(getErrorMessage(error)),
                })
            }
        )
    }

    if (isLoading) return <div>{t('common.loading')}</div>
    
    const zonesData = zones || []

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouseZones.warehouse')}</label>
                        <Select value={selectedWarehouseId} onValueChange={setSelectedWarehouseId}>
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
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {zonesData.map((zone: any) => (
                        <TableRow key={zone.id}>
                            <TableCell>{zone.code}</TableCell>
                            <TableCell>{zone.name}</TableCell>
                            <TableCell>
                                <span className={zone.active ? 'text-green-600' : 'text-red-600'}>
                                    {zone.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/directories/warehouse-zones/${zone.id}` as Route}>{t('common.view')}</Link>
                                </Button>
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
            
            {/* No pagination - using list endpoint */}

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
