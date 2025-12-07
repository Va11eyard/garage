'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useEmployee } from '@/features/manage-employees/model/useEmployee'
import { useTransferEmployee } from '@/features/manage-employees/model/useTransferEmployee'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function EmployeeEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: employee, isLoading } = useEmployee(id)
    const transferMutation = useTransferEmployee(id)
    const { data: organizationsData } = useOrganizations({ page: 0, size: 1000 })
    
    const [formData, setFormData] = useState({
        organizationId: '',
        orgUnitId: '',
        positionName: '',
        rankName: '',
        responsible: false,
        eventDate: '',
        comment: '',
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const { data: orgUnitsData } = useOrgUnitsByOrganization(formData.organizationId)
    const orgUnits = orgUnitsData || []

    useEffect(() => {
        if (employee) {
            setFormData({
                organizationId: employee.organizationId || '',
                orgUnitId: employee.orgUnitId || '',
                positionName: employee.positionName || '',
                rankName: employee.rankName || '',
                responsible: employee.responsible ?? false,
                eventDate: new Date().toISOString().split('T')[0],
                comment: '',
            })
        }
    }, [employee])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})
        
        const errors: Record<string, string> = {}
        if (!formData.eventDate) errors.eventDate = t('common.required')
        
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        try {
            await transferMutation.mutateAsync({
                eventDate: formData.eventDate,
                organizationId: formData.organizationId || undefined,
                orgUnitId: formData.orgUnitId || undefined,
                positionName: formData.positionName || undefined,
                rankName: formData.rankName || undefined,
                responsible: formData.responsible,
                comment: formData.comment || undefined,
            })
            toast.success(t('common.success'))
            router.push(`/staff/employees/${id}`)
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

    if (isLoading) return <Spinner />
    if (!employee) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('employees.title'), href: '/staff/employees' },
                { label: employee.personnelNumber || '', href: `/staff/employees/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('employees.editEmployee')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('employees.eventDate')}</GovLabel>
                            <GovInput
                                type="date"
                                value={formData.eventDate}
                                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                            />
                            {fieldErrors.eventDate && <p className="text-sm text-red-600 mt-1">{fieldErrors.eventDate}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('employees.organization')}</GovLabel>
                            <Select
                                value={formData.organizationId || undefined}
                                onValueChange={(value) => setFormData({ ...formData, organizationId: value, orgUnitId: '' })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {organizationsData?.content?.map((org: any) => (
                                        <SelectItem key={org.id} value={org.id!}>
                                            {org.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldErrors.organizationId && <p className="text-sm text-red-600 mt-1">{fieldErrors.organizationId}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('employees.orgUnit')}</GovLabel>
                            <Select
                                value={formData.orgUnitId || undefined}
                                onValueChange={(value) => setFormData({ ...formData, orgUnitId: value })}
                                disabled={!formData.organizationId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {orgUnits?.map((unit: any) => (
                                        <SelectItem key={unit.id} value={unit.id!}>
                                            {unit.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldErrors.orgUnitId && <p className="text-sm text-red-600 mt-1">{fieldErrors.orgUnitId}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('employees.position')}</GovLabel>
                            <GovInput
                                value={formData.positionName}
                                onChange={(e) => setFormData({ ...formData, positionName: e.target.value })}
                                placeholder={t('employees.position')}
                            />
                            {fieldErrors.positionName && <p className="text-sm text-red-600 mt-1">{fieldErrors.positionName}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('employees.rank')}</GovLabel>
                            <GovInput
                                value={formData.rankName}
                                onChange={(e) => setFormData({ ...formData, rankName: e.target.value })}
                                placeholder={t('employees.rank')}
                            />
                            {fieldErrors.rankName && <p className="text-sm text-red-600 mt-1">{fieldErrors.rankName}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="responsible"
                                checked={formData.responsible}
                                onChange={(e) => setFormData({ ...formData, responsible: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <GovLabel htmlFor="responsible" className="mb-0">{t('employees.responsible')}</GovLabel>
                        </div>

                        <div>
                            <GovLabel>{t('common.comment')}</GovLabel>
                            <GovInput
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                placeholder={t('common.comment')}
                            />
                            {fieldErrors.comment && <p className="text-sm text-red-600 mt-1">{fieldErrors.comment}</p>}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <GovButton type="submit" disabled={transferMutation.isPending}>
                                {transferMutation.isPending ? t('common.loading') : t('common.save')}
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
