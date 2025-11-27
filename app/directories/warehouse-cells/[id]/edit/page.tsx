'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useWarehouseCell } from '@/features/manage-warehouse-cells/model/useWarehouseCell'
import { useUpdateWarehouseCell } from '@/features/manage-warehouse-cells/model/useUpdateWarehouseCell'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZonesByWarehouse } from '@/features/manage-warehouse-zones/model/useWarehouseZonesByWarehouse'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function WarehouseCellEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: cell, isLoading } = useWarehouseCell(id)
    const updateMutation = useUpdateWarehouseCell()
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    
    const [formData, setFormData] = useState({
        warehouseId: '',
        zoneId: '',
        code: '',
        description: '',
        capacity: '',
    })

    const { data: zones, isLoading: zonesLoading } = useWarehouseZonesByWarehouse(formData.warehouseId || undefined)

    useEffect(() => {
        if (cell) {
            setFormData({
                warehouseId: cell.warehouseId || '',
                zoneId: cell.zoneId || '',
                code: cell.code || '',
                description: cell.description || '',
                capacity: cell.capacity?.toString() || '',
            })
        }
    }, [cell])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.warehouseId || !formData.code) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    ...formData,
                    zoneId: formData.zoneId || undefined,
                    capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
                    description: formData.description || undefined,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/warehouse-cells')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />
    if (!cell) return <div>{t('common.notFound')}</div>

    const warehouses = warehousesData?.content || []

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('warehouseCells.title'), href: '/directories/warehouse-cells' },
                { label: cell.code || '', href: `/directories/warehouse-cells/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('warehouseCells.editCell')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('warehouseCells.warehouse')}</GovLabel>
                            <Select
                                value={formData.warehouseId}
                                onValueChange={(value) => setFormData({ ...formData, warehouseId: value, zoneId: '' })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('warehouseCells.selectWarehouse')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {warehouses.map((w: any) => (
                                        <SelectItem key={w.id} value={w.id}>
                                            {w.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <GovLabel>{t('warehouseCells.zone')}</GovLabel>
                            <Select
                                value={formData.zoneId}
                                onValueChange={(value) => setFormData({ ...formData, zoneId: value })}
                                disabled={!formData.warehouseId || zonesLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('warehouseCells.selectZone')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {zones && zones.length > 0 ? (
                                        zones.map((z: any) => (
                                            <SelectItem key={z.id} value={z.id}>
                                                {z.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="px-2 py-1.5 text-sm text-gray-500">
                                            {formData.warehouseId ? t('common.noData') : t('warehouseCells.selectWarehouse')}
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <GovLabel required>{t('warehouseCells.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                                placeholder={t('warehouseCells.code')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('warehouseCells.description')}</GovLabel>
                            <GovInput
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder={t('warehouseCells.description')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('warehouseCells.capacity')}</GovLabel>
                            <GovInput
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                placeholder={t('warehouseCells.capacity')}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <GovButton type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? t('common.loading') : t('common.save')}
                            </GovButton>
                            <GovButton 
                                type="button" 
                                variant="secondary"
                                onClick={() => router.back()}
                            >
                                {t('common.cancel')}
                            </GovButton>
                        </div>
                    </form>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
