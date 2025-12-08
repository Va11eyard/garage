'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZone } from '@/features/manage-warehouse-zones/model/useWarehouseZone'
import { useUpdateWarehouseZone } from '@/features/manage-warehouse-zones/model/useUpdateWarehouseZone'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'
import type { WarehouseDto } from '@/shared/api/generated/__swagger_client/models/WarehouseDto'

export default function WarehouseZoneEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: warehouses, isLoading: warehousesLoading } = useWarehouses({})
    const { data: zone, isLoading: zoneLoading } = useWarehouseZone(id)
    const updateMutation = useUpdateWarehouseZone()
    
    const [formData, setFormData] = useState({
        warehouseId: '',
        code: '',
        name: '',
        sortOrder: 0,
        active: true,
    })

    useEffect(() => {
        if (zone) {
            setFormData({
                warehouseId: zone.warehouseId || '',
                code: zone.code || '',
                name: zone.name || '',
                sortOrder: zone.sortOrder || 0,
                active: zone.active ?? true,
            })
        }
    }, [zone])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.warehouseId || !formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    ...formData,
                    sortOrder: formData.sortOrder || 0,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/warehouse-zones')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (zoneLoading || warehousesLoading) return <Spinner />
    if (!zone) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('warehouseZones.title'), href: '/directories/warehouse-zones' },
                { label: zone.code || id },
                { label: t('common.edit') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('warehouseZones.warehouse')}</GovLabel>
                    <Select
                        value={formData.warehouseId}
                        onValueChange={(value) => setFormData({ ...formData, warehouseId: value })}
                        required
                        disabled
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('warehouseZones.selectWarehouse')} />
                        </SelectTrigger>
                        <SelectContent>
                            {warehouses?.content?.map((warehouse: WarehouseDto) => (
                                <SelectItem key={warehouse.id} value={warehouse.id!}>
                                    {warehouse.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 mt-1">{t('warehouseZones.warehouseCannotBeChanged')}</p>
                </div>

                <div>
                    <GovLabel required>{t('warehouseZones.code')}</GovLabel>
                    <GovInput
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        required
                        placeholder={t('warehouseZones.code')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('warehouseZones.name')}</GovLabel>
                    <GovInput
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder={t('warehouseZones.name')}
                    />
                </div>

                <div>
                    <GovLabel>{t('warehouseZones.sortOrder')}</GovLabel>
                    <GovInput
                        type="number"
                        value={formData.sortOrder}
                        onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                        placeholder={t('warehouseZones.sortOrder')}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="active"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="h-4 w-4"
                    />
                    <label htmlFor="active" className="text-sm font-medium">
                        {t('common.active')}
                    </label>
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
        </div>
    )
}
