'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect } from '@/gov-design/components/Form'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useCreateWarehouseZone } from '@/features/manage-warehouse-zones/model/useCreateWarehouseZone'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import type { WarehouseDto } from '@/shared/api/generated/__swagger_client/models/WarehouseDto'

export default function WarehouseZoneCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const { data: warehouses, isLoading } = useWarehouses({})
    const createMutation = useCreateWarehouseZone()
    
    const [formData, setFormData] = useState({
        warehouseId: '',
        code: '',
        name: '',
        sortOrder: 0,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.warehouseId || !formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                ...formData,
                sortOrder: formData.sortOrder || 0,
            })
            toast.success(t('common.success'))
            router.push('/directories/warehouse-zones')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('warehouseZones.title'), href: '/directories/warehouse-zones' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                        <div>
                            <GovLabel required>{t('warehouseZones.warehouse')}</GovLabel>
                            <GovSelect
                                value={formData.warehouseId}
                                onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
                                required
                            >
                                <option value="">{t('warehouseZones.selectWarehouse')}</option>
                                {warehouses?.content?.map((warehouse: WarehouseDto) => (
                                    <option key={warehouse.id} value={warehouse.id!}>
                                        {warehouse.name}
                                    </option>
                                ))}
                            </GovSelect>
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
