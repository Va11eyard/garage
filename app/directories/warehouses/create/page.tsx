'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect, GovTextarea } from '@/gov-design/components/Form'
import { useCreateWarehouse } from '@/features/manage-warehouses/model/useCreateWarehouse'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function WarehouseCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateWarehouse()
    const { data: organizations, isLoading: orgsLoading } = useOrganizations({})
    
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.organizationId || !formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                ...formData,
                orgUnitId: formData.orgUnitId || undefined,
                address: formData.address || undefined,
                description: formData.description || undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/warehouses')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    const handleOrganizationChange = (value: string) => {
        setFormData({ ...formData, organizationId: value, orgUnitId: '' })
    }

    if (orgsLoading) return <Spinner />

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('warehouses.title'), href: '/directories/warehouses' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('warehouses.organization')}</GovLabel>
                    <GovSelect
                        value={formData.organizationId}
                        onChange={(e) => handleOrganizationChange(e.target.value)}
                        required
                    >
                        <option value="">{t('warehouses.selectOrganization')}</option>
                        {organizations?.content?.map((org: any) => (
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
                            <option value="">{t('common.select')}</option>
                            {orgUnits.map((unit: any) => (
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
                        placeholder={t('warehouses.code')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('warehouses.name')}</GovLabel>
                    <GovInput
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder={t('warehouses.name')}
                    />
                </div>

                <div>
                    <GovLabel>{t('warehouses.address')}</GovLabel>
                    <GovInput
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder={t('warehouses.address')}
                    />
                </div>

                <div>
                    <GovLabel>{t('warehouses.description')}</GovLabel>
                    <GovTextarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder={t('warehouses.description')}
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
                    <GovLabel htmlFor="active" className="mb-0">{t('common.active')}</GovLabel>
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
