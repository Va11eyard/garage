'use client'

import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZonesSearch } from '@/features/manage-warehouse-zones/model/useWarehouseZonesSearch'
import { useWarehouseCellsSearch } from '@/features/manage-warehouse-cells/model/useWarehouseCellsSearch'
import { useDeleteWarehouseCell } from '@/features/manage-warehouse-cells/model/useDeleteWarehouseCell'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import Link from 'next/link'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function WarehouseCellsTable() {
    const { t } = useTranslation()
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('__ALL__')
    const [selectedZoneId, setSelectedZoneId] = useState('__ALL__')
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    
    // Get all warehouse IDs for "All" filter
    const warehouseIds = warehousesData?.content?.map((w: any) => w.id).filter(Boolean) || []
    
    const { data: zones, isLoading: zonesLoading } = useWarehouseZonesSearch({ 
        warehouseId: selectedWarehouseId !== '__ALL__' ? selectedWarehouseId : undefined,
        warehouseIds: selectedWarehouseId === '__ALL__' ? warehouseIds : undefined,
    })
    
    // Get all zone IDs for "All" filter
    const zoneIds = zones?.map((z: any) => z.id).filter(Boolean) || []
    
    const { data: cells, isLoading } = useWarehouseCellsSearch({ 
        warehouseId: selectedWarehouseId !== '__ALL__' && selectedZoneId === '__ALL__' ? selectedWarehouseId : undefined,
        warehouseIds: selectedWarehouseId === '__ALL__' && selectedZoneId === '__ALL__' ? warehouseIds : undefined,
        zoneId: selectedZoneId !== '__ALL__' ? selectedZoneId : undefined,
        zoneIds: selectedWarehouseId === '__ALL__' && selectedZoneId === '__ALL__' ? zoneIds : undefined,
    })
    const deleteMutation = useDeleteWarehouseCell()
    
    const warehouses = warehousesData?.content || []
    const zonesData = zones || []
    const cellsData = cells || []

    const handleDelete = (id: string) => {
        if (confirm(t('warehouseCells.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: (error: any) => toast.error(getErrorMessage(error)),
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouseCells.warehouse')}</label>
                        <Select 
                            value={selectedWarehouseId} 
                            onValueChange={(value) => {
                                setSelectedWarehouseId(value)
                                setSelectedZoneId('__ALL__')
                            }}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                                {warehouses.map((w: any) => (
                                    <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouseCells.zone')}</label>
                        <Select 
                            value={selectedZoneId} 
                            onValueChange={setSelectedZoneId}
                            disabled={zonesLoading}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={zonesLoading ? t('common.loading') : t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                                {zonesData.map((z: any) => (
                                    <SelectItem key={z.id} value={z.id}>{z.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/directories/warehouse-cells/create">{t('warehouseCells.createCell')}</Link>
                </Button>
            </div>

            {isLoading && <div>{t('common.loading')}</div>}

            {!isLoading && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('warehouseCells.code')}</TableHead>
                            <TableHead>{t('warehouseCells.description')}</TableHead>
                            <TableHead>{t('warehouseCells.capacity')}</TableHead>
                            <TableHead>{t('common.status')}</TableHead>
                            <TableHead>{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cellsData.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell>{c.code}</TableCell>
                                <TableCell>{c.description}</TableCell>
                                <TableCell>{c.capacity}</TableCell>
                                <TableCell>
                                    <span className={c.active ? 'text-green-600' : 'text-red-600'}>
                                        {c.active ? t('common.active') : t('common.inactive')}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/directories/warehouse-cells/${c.id}`}>
                                        <Button variant="ghost" size="sm">{t('common.view')}</Button>
                                    </Link>
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
