'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect } from '@/gov-design/components/Form'
import { useWarehouseCell } from '@/features/manage-warehouse-cells/model/useWarehouseCell'
import { useUpdateWarehouseCell } from '@/features/manage-warehouse-cells/model/useUpdateWarehouseCell'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZones } from '@/features/manage-warehouse-zones/model/useWarehouseZones'
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

    const { data: zones } = useWarehouseZones(formData.warehouseId)

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
        
        if (!formData.warehouseId || !formData.zoneId || !formData.code) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    ...formData,
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
                            <GovSelect
                                value={formData.warehouseId}
                                onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value, zoneId: '' })}
                                required
                            >
                                <option value="">{t('warehouseCells.selectWarehouse')}</option>
                                {warehouses.map((w: any) => (
                                    <option key={w.id} value={w.id}>
                                        {w.name}
                                    </option>
                                ))}
                            </GovSelect>
                        </div>

                        <div>
                            <GovLabel required>{t('warehouseCells.zone')}</GovLabel>
                            <GovSelect
                                value={formData.zoneId}
                                onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                                required
                                disabled={!formData.warehouseId}
                            >
                                <option value="">{t('warehouseCells.selectZone')}</option>
                                {zones?.map((z: any) => (
                                    <option key={z.id} value={z.id}>
                                        {z.name}
                                    </option>
                                ))}
                            </GovSelect>
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
