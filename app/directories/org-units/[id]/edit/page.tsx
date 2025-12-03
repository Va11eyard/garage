'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useOrgUnit } from '@/features/manage-org-units/model/useOrgUnit'
import { useUpdateOrgUnit } from '@/features/manage-org-units/model/useUpdateOrgUnit'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function OrgUnitEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: orgUnit, isLoading } = useOrgUnit(id)
    const updateMutation = useUpdateOrgUnit()
    const { data: organizations } = useOrganizations({})
    
    const [formData, setFormData] = useState({
        organizationId: '',
        code: '',
        name: '',
        parentId: '',
        unitType: '',
    })

    const { data: orgUnits } = useOrgUnitsByOrganization(formData.organizationId)

    useEffect(() => {
        if (orgUnit) {
            setFormData({
                organizationId: orgUnit.organizationId || '',
                code: orgUnit.code || '',
                name: orgUnit.name || '',
                parentId: orgUnit.parentId || '',
                unitType: orgUnit.unitType || '',
            })
        }
    }, [orgUnit])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.organizationId || !formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    ...formData,
                    parentId: formData.parentId || undefined,
                    unitType: formData.unitType || undefined,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/org-units')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    const handleOrganizationChange = (value: string) => {
        setFormData({ ...formData, organizationId: value, parentId: '' })
    }

    if (isLoading) return <Spinner />
    if (!orgUnit) return <div>{t('common.notFound')}</div>

    const availableParents = orgUnits?.filter((u: any) => u.id !== id) || []

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('orgUnits.title'), href: '/directories/org-units' },
                { label: orgUnit.name || '', href: `/directories/org-units/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('orgUnits.editUnit')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
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
                                        <SelectItem key={org.id} value={org.id}>
                                            {org.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

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

                        {formData.organizationId && availableParents.length > 0 && (
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
                                        {availableParents.map((unit: any) => (
                                            <SelectItem key={unit.id} value={unit.id}>
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
