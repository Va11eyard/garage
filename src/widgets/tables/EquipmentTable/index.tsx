'use client'

import { useEquipment } from '@/features/manage-equipment/model/useEquipment'
import { useTestIntegrationEndpoint } from '@/features/manage-integration-endpoints/model/useTestIntegrationEndpoint'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import { toast } from 'sonner'
import { format } from 'date-fns'
import Link from 'next/link'

export function EquipmentTable() {
    const { t } = useTranslation()
    const { data, isLoading } = useEquipment()

    if (isLoading) return <Spinner />

    const getStatusBadge = (status: string) => {
        const variants = {
            ACTIVE: 'default',
            INACTIVE: 'secondary',
            ERROR: 'destructive',
        } as const
        return variants[status as keyof typeof variants] || 'secondary'
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
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
                    {data?.map((device) => (
                        <TableRow key={device.id}>
                            <TableCell className="font-mono">{device.code}</TableCell>
                            <TableCell>{device.name}</TableCell>
                            <TableCell>{device.type}</TableCell>
                            <TableCell>{device.warehouseName || '—'}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusBadge(device.status)}>
                                    {t(`equipment.deviceStatus.${device.status.toLowerCase()}`)}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {device.lastHeartbeat
                                    ? format(new Date(device.lastHeartbeat), 'dd.MM.yyyy HH:mm')
                                    : '—'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
