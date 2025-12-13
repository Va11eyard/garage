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
import { useOrganization } from '@/features/manage-organizations/model/useOrganization'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function OrgUnitEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: orgUnit, isLoading } = useOrgUnit(id)
    const updateMutation = useUpdateOrgUnit()
    const { data: organizations } = useOrganizations({})
    const { data: currentOrganization } = useOrganization(orgUnit?.organizationId || '')
    
    const [formData, setFormData] = useState({
        organizationId: '',
        code: '',
        name: '',
        parentId: '',
        unitType: '',
        active: true,
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const { data: orgUnits } = useOrgUnitsByOrganization(formData.organizationId)

    useEffect(() => {
        if (orgUnit) {
            setFormData({
                organizationId: orgUnit.organizationId || '',
                code: orgUnit.code || '',
                name: orgUnit.name || '',
                parentId: orgUnit.parentId || '',
                unitType: orgUnit.unitType || '',
                active: orgUnit.active ?? true,
            })
        }
    }, [orgUnit])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})
        
        const errors: Record<string, string> = {}
        if (!formData.organizationId) errors.organizationId = t('common.required')
        if (!formData.code) errors.code = t('common.required')
        if (!formData.name) errors.name = t('common.required')
        
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
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
        } catch (error: any) {
            if (error?.body?.errors) {
                const apiErrors: Record<string, string> = {}
                const errors = error.body.errors
                if (typeof errors === 'object' && !Array.isArray(errors)) {
                    Object.keys(errors).forEach(field => {
                        const fieldError = errors[field]
                        apiErrors[field] = Array.isArray(fieldError) ? fieldError[0] : fieldError
                    })
                    setFieldErrors(apiErrors)
                }
            }
            toast.error(getErrorMessage(error))
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
                            <GovInput
                                value={currentOrganization?.name || ''}
                                disabled
                                className="bg-gray-50"
                            />
                            <p className="text-sm text-gray-500 mt-1">{t('orgUnits.organizationCannotBeChanged')}</p>
                            {fieldErrors.organizationId && <p className="text-sm text-red-600 mt-1">{fieldErrors.organizationId}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('orgUnits.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder={t('orgUnits.code')}
                            />
                            {fieldErrors.code && <p className="text-sm text-red-600 mt-1">{fieldErrors.code}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('orgUnits.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t('orgUnits.name')}
                            />
                            {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
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
