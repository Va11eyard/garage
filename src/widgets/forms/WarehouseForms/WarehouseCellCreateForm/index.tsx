'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
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
            await Service.createWarehouseCell({
                warehouseId: formData.warehouseId,
                zoneId: formData.zoneId || undefined,
                code: formData.code,
                description: formData.description || undefined,
                capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/warehouse-cells')
        } catch (error: any) {
            const errorMessage = error?.body?.message || error?.message || t('common.error')
            toast.error(errorMessage)
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
                            <Select
                                value={formData.warehouseId}
                                onValueChange={(value) => setFormData({ ...formData, warehouseId: value, zoneId: '' })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('warehouseCells.selectWarehouse')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {warehouses?.content?.map((warehouse: any) => (
                                        <SelectItem key={warehouse.id} value={warehouse.id!}>
                                            {warehouse.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.warehouseId && zones && zones.length > 0 && (
                            <div>
                                <GovLabel>{t('warehouseCells.zone')}</GovLabel>
                                <Select
                                    value={formData.zoneId}
                                    onValueChange={(value) => setFormData({ ...formData, zoneId: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('warehouseCells.selectZone')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {zones.map((zone: any) => (
                                            <SelectItem key={zone.id} value={zone.id!}>
                                                {zone.name}
                                            </SelectItem>
                                        ))}
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
