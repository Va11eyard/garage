'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect, GovTextarea } from '@/gov-design/components/Form'
import { useWarehouse } from '@/features/manage-warehouses/model/useWarehouse'
import { useUpdateWarehouse } from '@/features/manage-warehouses/model/useUpdateWarehouse'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import type { OrganizationDto } from '@/shared/api/generated/__swagger_client/models/OrganizationDto'
import type { OrgUnitDto } from '@/shared/api/generated/__swagger_client/models/OrgUnitDto'

export default function WarehouseEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: warehouse, isLoading } = useWarehouse(id)
    const updateMutation = useUpdateWarehouse()
    const { data: organizations } = useOrganizations({})
    
    const [formData, setFormData] = useState({
        organizationId: '',
        orgUnitId: '',
        code: '',
        name: '',
        address: '',
        description: '',
        active: true,
    })

    const { data: orgUnits } = useOrgUnitsByOrganization(formData.organizationId)

    useEffect(() => {
        if (warehouse) {
            setFormData({
                organizationId: warehouse.organizationId || '',
                orgUnitId: warehouse.orgUnitId || '',
                code: warehouse.code || '',
                name: warehouse.name || '',
                address: warehouse.address || '',
                description: warehouse.description || '',
                active: warehouse.active ?? true,
            })
        }
    }, [warehouse])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.organizationId || !formData.code || !formData.name) {
            toast.error('Заполните обязательные поля')
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    ...formData,
                    orgUnitId: formData.orgUnitId || undefined,
                    address: formData.address || undefined,
                    description: formData.description || undefined,
                }
            })
            toast.success('Склад успешно обновлён')
            router.push('/directories/warehouses')
        } catch (error) {
            toast.error('Ошибка при обновлении склада')
        }
    }

    const handleOrganizationChange = (value: string) => {
        setFormData({ ...formData, organizationId: value, orgUnitId: '' })
    }

    if (isLoading) return <Spinner />
    if (!warehouse) return <div>Склад не найден</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: 'НСИ', href: '/directories' },
                { label: 'Склады', href: '/directories/warehouses' },
                { label: warehouse.name || '', href: `/directories/warehouses/${id}` },
                { label: 'Редактировать' }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>Редактировать склад</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('warehouses.organization')}</GovLabel>
                            <GovSelect
                                value={formData.organizationId}
                                onChange={(e) => handleOrganizationChange(e.target.value)}
                                required
                            >
                                <option value="">{t('warehouses.selectOrganization')}</option>
                                {organizations?.content?.map((org: OrganizationDto) => (
                                    <option key={org.id} value={org.id!}>
                                        {org.name}
                                    </option>
                                ))}
                            </GovSelect>
                        </div>

                        {formData.organizationId && orgUnits && orgUnits.length > 0 && (
                            <div>
                                <GovLabel>{t('warehouses.orgUnit')}</GovLabel>
                                <GovSelect
                                    value={formData.orgUnitId}
                                    onChange={(e) => setFormData({ ...formData, orgUnitId: e.target.value })}
                                >
                                    <option value="">Не выбрано</option>
                                    {orgUnits.map((unit: OrgUnitDto) => (
                                        <option key={unit.id} value={unit.id!}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </GovSelect>
                            </div>
                        )}

                        <div>
                            <GovLabel required>{t('warehouses.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <GovLabel required>{t('warehouses.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <GovLabel>{t('warehouses.address')}</GovLabel>
                            <GovInput
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('warehouses.description')}</GovLabel>
                            <GovTextarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="active"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <GovLabel htmlFor="active" className="mb-0">Активен</GovLabel>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <GovButton type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? 'Сохранение...' : t('common.save')}
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
