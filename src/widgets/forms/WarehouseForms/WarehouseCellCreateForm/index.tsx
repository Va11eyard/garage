'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect, GovTextarea } from '@/gov-design/components/Form'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZonesByWarehouse } from '@/features/manage-warehouse-zones/model/useWarehouseZonesByWarehouse'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Service } from '@/shared/api/generated/__swagger_client'
import { Spinner } from '@/shared/ui/spinner'

export function WarehouseCellCreateForm() {
    const router = useRouter()
    const { t } = useTranslation()
    const { data: warehouses, isLoading } = useWarehouses({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const [formData, setFormData] = useState({
        warehouseId: '',
        zoneId: '',
        code: '',
        description: '',
        capacity: '',
    })

    const { data: zones } = useWarehouseZonesByWarehouse(formData.warehouseId || undefined)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.warehouseId || !formData.code) {
            toast.error(t('common.required'))
            return
        }

        setIsSubmitting(true)
        try {
            await Service.create3({
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
        } finally {
            setIsSubmitting(false)
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

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('warehouseCells.createCell')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('warehouseCells.warehouse')}</GovLabel>
                            <GovSelect
                                value={formData.warehouseId}
                                onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value, zoneId: '' })}
                                required
                            >
                                <option value="">{t('warehouseCells.selectWarehouse')}</option>
                                {warehouses?.content?.map((warehouse) => (
                                    <option key={warehouse.id} value={warehouse.id!}>
                                        {warehouse.name}
                                    </option>
                                ))}
                            </GovSelect>
                        </div>

                        {formData.warehouseId && zones && zones.length > 0 && (
                            <div>
                                <GovLabel>{t('warehouseCells.zone')}</GovLabel>
                                <GovSelect
                                    value={formData.zoneId}
                                    onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                                >
                                    <option value="">{t('warehouseCells.selectZone')}</option>
                                    {zones.map((zone) => (
                                        <option key={zone.id} value={zone.id!}>
                                            {zone.name}
                                        </option>
                                    ))}
                                </GovSelect>
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
                            <GovButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? t('common.loading') : t('common.create')}
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
