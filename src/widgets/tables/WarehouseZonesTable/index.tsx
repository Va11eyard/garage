'use client'

import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZones } from '@/features/manage-warehouse-zones/model/useWarehouseZones'
import { useDeleteWarehouseZone } from '@/features/manage-warehouse-zones/model/useDeleteWarehouseZone'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useState } from 'react'
import { GovTable, GovTableBody, GovTableCell, GovTableHead, GovTableHeader, GovTableRow } from '@/gov-design/components/Table'
import { GovButton } from '@/gov-design/components/Button'
import { GovLabel, GovSelect } from '@/gov-design/components/Form'
import { GovConfirmModal } from '@/gov-design/patterns'
import { toast } from 'sonner'
import { Edit, Trash2 } from 'lucide-react'

export function WarehouseZonesTable() {
    const { t } = useTranslation()
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('')
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const { data: warehouses } = useWarehouses({ page: 0, size: 100 })
    const { data: zones, isLoading } = useWarehouseZones(selectedWarehouseId)
    const deleteMutation = useDeleteWarehouseZone()

    const handleDelete = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId, {
                onSuccess: () => {
                    toast.success(t('common.success'))
                    setDeleteId(null)
                },
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end gap-4">
                <div className="max-w-md flex-1">
                    <GovLabel>{t('warehouseZones.selectWarehouse')}</GovLabel>
                    <GovSelect
                        value={selectedWarehouseId}
                        onChange={(e) => setSelectedWarehouseId(e.target.value)}
                    >
                        <option value="">{t('warehouseZones.selectWarehouse')}</option>
                        {warehouses?.content?.map((w: any) => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                        ))}
                    </GovSelect>
                </div>
                <GovButton asChild className="shrink-0">
                    <a href="/directories/warehouse-zones/create">{t('warehouseZones.createZone')}</a>
                </GovButton>
            </div>

            {isLoading && <div className="text-center py-8 text-gov-gray-600">{t('common.loading')}</div>}

            {zones && zones.length > 0 && (
                <GovTable>
                    <GovTableHeader>
                        <GovTableRow>
                            <GovTableHead>{t('warehouseZones.code')}</GovTableHead>
                            <GovTableHead>{t('warehouseZones.name')}</GovTableHead>
                            <GovTableHead>{t('warehouseZones.sortOrder')}</GovTableHead>
                            <GovTableHead>{t('common.actions')}</GovTableHead>
                        </GovTableRow>
                    </GovTableHeader>
                    <GovTableBody>
                        {zones.map((z: any) => (
                            <GovTableRow key={z.id}>
                                <GovTableCell className="font-medium">{z.code}</GovTableCell>
                                <GovTableCell>{z.name}</GovTableCell>
                                <GovTableCell>{z.sortOrder}</GovTableCell>
                                <GovTableCell>
                                    <div className="flex gap-2">
                                        <GovButton variant="ghost" size="sm">
                                            <Edit className="w-4 h-4 mr-1" />
                                            {t('common.edit')}
                                        </GovButton>
                                        <GovButton
                                            variant="ghost"
                                            size="sm"
                                            className="text-gov-red-500 hover:text-gov-red-600"
                                            onClick={() => setDeleteId(z.id!)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            {t('common.delete')}
                                        </GovButton>
                                    </div>
                                </GovTableCell>
                            </GovTableRow>
                        ))}
                    </GovTableBody>
                </GovTable>
            )}

            {zones && zones.length === 0 && selectedWarehouseId && (
                <div className="text-center py-12 text-gov-gray-500">
                    {t('common.noData')}
                </div>
            )}

            <GovConfirmModal
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title={t('warehouseZones.deleteConfirm')}
                message="Вы уверены, что хотите удалить эту зону склада?"
                confirmText={t('common.delete')}
                cancelText={t('common.cancel')}
                variant="danger"
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
