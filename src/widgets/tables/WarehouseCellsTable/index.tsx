'use client'

import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZones } from '@/features/manage-warehouse-zones/model/useWarehouseZones'
import { useWarehouseCellsByZone } from '@/features/manage-warehouse-cells/model/useWarehouseCells'
import { useDeleteWarehouseCell } from '@/features/manage-warehouse-cells/model/useDeleteWarehouseCell'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'

export function WarehouseCellsTable() {
    const { t } = useTranslation()
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('')
    const [selectedZoneId, setSelectedZoneId] = useState('')
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    const { data: zones, isLoading: zonesLoading } = useWarehouseZones(selectedWarehouseId)
    const { data: cells, isLoading } = useWarehouseCellsByZone(selectedZoneId)
    const deleteMutation = useDeleteWarehouseCell()
    
    const warehouses = warehousesData?.content || []

    const handleDelete = (id: string) => {
        if (confirm(t('warehouseCells.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouseCells.warehouse')}</label>
                        <select
                            value={selectedWarehouseId}
                            onChange={(e) => {
                                setSelectedWarehouseId(e.target.value)
                                setSelectedZoneId('')
                            }}
                            className="border rounded px-3 py-2 w-full min-w-[200px]"
                        >
                            <option value="">{t('warehouseCells.selectWarehouse')}</option>
                            {warehouses.map((w: any) => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouseCells.zone')}</label>
                        <select
                            value={selectedZoneId}
                            onChange={(e) => setSelectedZoneId(e.target.value)}
                            className="border rounded px-3 py-2 w-full min-w-[200px]"
                            disabled={!selectedWarehouseId || zonesLoading}
                        >
                            <option value="">
                                {zonesLoading ? t('common.loading') : t('warehouseCells.selectZone')}
                            </option>
                            {zones && zones.length > 0 ? (
                                zones.map((z: any) => (
                                    <option key={z.id} value={z.id}>{z.name}</option>
                                ))
                            ) : selectedWarehouseId && !zonesLoading ? (
                                <option disabled>{t('warehouseCells.noZones')}</option>
                            ) : null}
                        </select>
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/directories/warehouse-cells/create">{t('warehouseCells.createCell')}</Link>
                </Button>
            </div>

            {isLoading && <div>{t('common.loading')}</div>}

            {cells && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('warehouseCells.code')}</TableHead>
                            <TableHead>{t('warehouseCells.description')}</TableHead>
                            <TableHead>{t('warehouseCells.capacity')}</TableHead>
                            <TableHead>{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cells.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell>{c.code}</TableCell>
                                <TableCell>{c.description}</TableCell>
                                <TableCell>{c.capacity}</TableCell>
                                <TableCell>
                                    <Link href={`/directories/warehouse-cells/${c.id}/edit`}>
                                        <Button variant="ghost" size="sm">{t('common.edit')}</Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600"
                                        onClick={() => handleDelete(c.id!)}
                                    >
                                        {t('common.delete')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
