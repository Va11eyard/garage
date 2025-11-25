'use client'

import { useCreateOrgUnit } from '@/features/manage-org-units/model/useCreateOrgUnit'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect } from '@/gov-design/components/Form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function OrgUnitCreateForm() {
    const { t } = useTranslation()
    const { mutateAsync } = useCreateOrgUnit()
    const router = useRouter()
    const { data: organizations } = useOrganizations({})
    const [selectedOrgId, setSelectedOrgId] = useState<string>('')
    const { data: orgUnits } = useOrgUnitsByOrganization(selectedOrgId)
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        organizationId: '',
        parentId: '',
        unitType: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name || !formData.organizationId) {
            toast.error(t('common.required'))
            return
        }

        try {
            await mutateAsync({
                ...formData,
                parentId: formData.parentId || undefined,
                unitType: formData.unitType || undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/org-units')
        } catch {
            toast.error(t('common.error'))
        }
    }

    const handleOrganizationChange = (value: string) => {
        setFormData({ ...formData, organizationId: value, parentId: '' })
        setSelectedOrgId(value)
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('orgUnits.title'), href: '/directories/org-units' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('orgUnits.code')}</GovLabel>
                    <GovInput
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        required
                        placeholder={t('orgUnits.code')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('orgUnits.name')}</GovLabel>
                    <GovInput
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder={t('orgUnits.name')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('orgUnits.organization')}</GovLabel>
                    <GovSelect
                        value={formData.organizationId}
                        onChange={(e) => handleOrganizationChange(e.target.value)}
                        required
                    >
                        <option value="">{t('organizations.selectOrganization')}</option>
                        {organizations?.content?.map((org: any) => (
                            <option key={org.id} value={org.id!}>
                                {org.name}
                            </option>
                        ))}
                    </GovSelect>
                </div>

                {selectedOrgId && orgUnits && orgUnits.length > 0 && (
                    <div>
                        <GovLabel>{t('orgUnits.parentUnit')}</GovLabel>
                        <GovSelect
                            value={formData.parentId}
                            onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
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
                    <GovLabel>{t('orgUnits.type')}</GovLabel>
                    <GovInput
                        value={formData.unitType}
                        onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                        placeholder={t('orgUnits.type')}
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <GovButton type="submit">
                        {t('common.create')}
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
