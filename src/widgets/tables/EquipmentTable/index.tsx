'use client'

import { useEquipment } from '@/features/manage-equipment/model/useEquipment'
import { useTestIntegrationEndpoint } from '@/features/manage-integration-endpoints/model/useTestIntegrationEndpoint'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useFilters } from '@/shared/hooks/use-filters'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { toast } from 'sonner'
import { format } from 'date-fns'
import Link from 'next/link'
import { useMemo } from 'react'
import { Device } from '@/shared/api/generated/__swagger_client'

export function EquipmentTable() {
    const { t } = useTranslation()
    const { data, isLoading } = useEquipment()
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    const { filters, updateFilter } = useFilters({
        warehouseId: 'ALL',
        type: '',
        status: 'ALL'
    })

    const filteredData = useMemo(() => {
        if (!data) return []
        return data.filter((device: Device) => {
            const matchesWarehouse = filters.warehouseId === 'ALL' || device.warehouse?.id === filters.warehouseId
            const matchesType = !filters.type || device.type?.toLowerCase().includes(filters.type.toLowerCase())
            const matchesStatus = filters.status === 'ALL' || device.status === filters.status
            return matchesWarehouse && matchesType && matchesStatus
        })
    }, [data, filters])

    if (isLoading) return <Spinner />

    const getStatusBadge = (status?: string) => {
        if (!status) return 'secondary'
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            ONLINE: 'default',
            OFFLINE: 'secondary',
            ERROR: 'destructive',
            NOT_CONFIGURED: 'outline',
            INACTIVE: 'secondary'
        }
        return variants[status] || 'secondary'
    }

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
                        <label className="block text-sm font-medium mb-1">{t('equipment.type')}</label>
                        <Input
                            value={filters.type}
                            onChange={(e) => updateFilter('type', e.target.value)}
                            placeholder={t('equipment.type')}
                        />
                    </div>
                    <div className="min-w-[150px]">
                        <label className="block text-sm font-medium mb-1">{t('equipment.status')}</label>
                        <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">{t('common.all')}</SelectItem>
                                <SelectItem value="ONLINE">{t('equipment.deviceStatus.online')}</SelectItem>
                                <SelectItem value="OFFLINE">{t('equipment.deviceStatus.offline')}</SelectItem>
                                <SelectItem value="ERROR">{t('equipment.deviceStatus.error')}</SelectItem>
                                <SelectItem value="NOT_CONFIGURED">{t('equipment.deviceStatus.notConfigured')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button variant="default" asChild className="text-black">
                    <Link href="/admin/equipment/create">{t('equipment.registerDevice')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('equipment.code')}</TableHead>
                        <TableHead>{t('equipment.name')}</TableHead>
                        <TableHead>{t('equipment.type')}</TableHead>
                        <TableHead>{t('equipment.warehouse')}</TableHead>
                        <TableHead>{t('equipment.status')}</TableHead>
                        <TableHead>{t('equipment.lastHeartbeat')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((device: Device) => (
                        <TableRow key={device.id}>
                            <TableCell className="font-mono">{device.code}</TableCell>
                            <TableCell>{device.name}</TableCell>
                            <TableCell>{device.type}</TableCell>
                            <TableCell>{device.warehouse?.name || '—'}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusBadge(device.status)}>
                                    {t(`equipment.deviceStatus.${device.status?.toLowerCase() || 'unknown'}`)}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {device.lastHeartbeat
                                    ? format(new Date(device.lastHeartbeat), 'dd.MM.yyyy HH:mm')
                                    : '—'}
                            </TableCell>
                        </TableRow>
                    ))}
                    {filteredData.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                {t('common.noData')}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
