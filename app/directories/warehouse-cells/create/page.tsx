'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZonesByWarehouse } from '@/features/manage-warehouse-zones/model/useWarehouseZonesByWarehouse'
import { useCreateWarehouseCell } from '@/features/manage-warehouse-cells/model/useCreateWarehouseCell'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function WarehouseCellCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const { data: warehouses, isLoading } = useWarehouses({})
    const createMutation = useCreateWarehouseCell()
    
    const [formData, setFormData] = useState({
        warehouseId: '',
        zoneId: '',
        code: '',
        description: '',
        capacity: '',
    })

    const { data: zones, isLoading: zonesLoading } = useWarehouseZonesByWarehouse(formData.warehouseId || undefined)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.warehouseId || !formData.code) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                warehouseId: formData.warehouseId,
                zoneId: formData.zoneId || undefined,
                code: formData.code,
                description: formData.description || undefined,
                capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/warehouse-cells')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('warehouseCells.title'), href: '/directories/warehouse-cells' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
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
                            {warehouses?.content?.map((warehouse) => (
                                <SelectItem key={warehouse.id} value={warehouse.id!}>
                                    {warehouse.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {formData.warehouseId && (
                    <div>
                        <GovLabel>{t('warehouseCells.zone')}</GovLabel>
                        <Select
                            value={formData.zoneId}
                            onValueChange={(value) => setFormData({ ...formData, zoneId: value })}
                            disabled={zonesLoading}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('warehouseCells.selectZone')} />
                            </SelectTrigger>
                            <SelectContent>
                                {zones && zones.length > 0 ? (
                                    zones.map((zone) => (
                                        <SelectItem key={zone.id} value={zone.id!}>
                                            {zone.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">
                                        {t('common.noData')}
                                    </div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                )}

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
                    <GovTextarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder={t('warehouseCells.description')}
                        rows={3}
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
                    <GovButton type="submit" disabled={createMutation.isPending}>
                        {createMutation.isPending ? t('common.loading') : t('common.create')}
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
        </div>
    )
}
