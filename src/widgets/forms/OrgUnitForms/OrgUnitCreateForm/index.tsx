'use client'

import { useCreateOrgUnit } from '@/features/manage-org-units/model/useCreateOrgUnit'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

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
        active: true,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name || !formData.organizationId) {
            toast.error(t('common.required'))
            return
        }

        try {
            await mutateAsync({
                organizationId: formData.organizationId,
                code: formData.code,
                name: formData.name,
                parentId: formData.parentId || undefined,
                unitType: formData.unitType || '',
                active: formData.active,
            })
            toast.success(t('common.success'))
            router.push('/directories/org-units')
        } catch (error) {
            toast.error(getErrorMessage(error))
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
                    <Select
                        value={formData.organizationId}
                        onValueChange={handleOrganizationChange}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('organizations.selectOrganization')} />
                        </SelectTrigger>
                        <SelectContent>
                            {organizations?.content?.map((org: any) => (
                                <SelectItem key={org.id} value={org.id!}>
                                    {org.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedOrgId && orgUnits && orgUnits.length > 0 && (
                    <div>
                        <GovLabel>{t('orgUnits.parentUnit')}</GovLabel>
                        <Select
                            value={formData.parentId}
                            onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('common.select')} />
                            </SelectTrigger>
                            <SelectContent>
                                {orgUnits.map((unit: any) => (
                                    <SelectItem key={unit.id} value={unit.id!}>
                                        {unit.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
