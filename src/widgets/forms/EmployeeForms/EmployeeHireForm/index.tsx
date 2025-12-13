'use client'

import { useHireEmployee } from '@/features/manage-employees/model/useHireEmployee'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { usePersons } from '@/features/manage-persons/model/usePersons'
import { useEmployeeCategories } from '@/features/manage-employee-categories/model/useEmployeeCategories'
import { useForm } from 'react-hook-form'
import { EmployeeHireRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovDatePickerController } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Label } from '@/shared/ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function EmployeeHireForm() {
    const { t } = useTranslation()
    const { register, handleSubmit, control, formState: { errors, isSubmitting }, setValue } = useForm<EmployeeHireRequest>()
    const { mutateAsync } = useHireEmployee()
    const { data: organizations } = useOrganizations({})
    const { data: persons } = usePersons({ page: 0, size: 100 })
    const { data: categories } = useEmployeeCategories()
    const [selectedOrgId, setSelectedOrgId] = useState<string>('')
    const { data: orgUnitsData } = useOrgUnitsByOrganization(selectedOrgId)
    const orgUnits = orgUnitsData || []
    const router = useRouter()

    const onSubmit = async (data: EmployeeHireRequest) => {
        try {
            const created = await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/staff/employees/${created.id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('breadcrumbs.employees'), href: '/staff/employees' },
                { label: t('breadcrumbs.hireEmployee') }
            ]} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('employees.person')}</GovLabel>
                    <Select onValueChange={(value) => setValue('personId', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('employees.selectPerson')} />
                        </SelectTrigger>
                        <SelectContent>
                            {(Array.isArray(persons) ? persons : persons?.content || []).map((person: any) => (
                                <SelectItem key={person.id} value={person.id!}>
                                    {person.lastName} {person.firstName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel required>{t('employees.organization')}</GovLabel>
                    <Select onValueChange={(value) => {
                        setValue('organizationId', value)
                        setSelectedOrgId(value)
                    }}>
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

                <div>
                    <GovLabel>{t('employees.orgUnit')}</GovLabel>
                    <Select onValueChange={(value) => setValue('orgUnitId', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('employees.selectOrgUnit')} />
                        </SelectTrigger>
                        <SelectContent>
                            {orgUnits?.map((unit: any) => (
                                <SelectItem key={unit.id} value={unit.id!}>
                                    {unit.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel required>{t('staff.personnelNumber')}</GovLabel>
                    <GovInput {...register('personnelNumber', { required: true })} placeholder={t('staff.personnelNumber')} />
                    {errors.personnelNumber && <span className="text-red-600 text-sm">{t('common.required')}</span>}
                </div>

                <div>
                    <GovLabel required>{t('employees.position')}</GovLabel>
                    <GovInput {...register('positionName', { required: true })} placeholder={t('employees.position')} />
                    {errors.positionName && <span className="text-red-600 text-sm">{t('common.required')}</span>}
                </div>

                <div>
                    <GovLabel required>{t('employees.hireDate')}</GovLabel>
                    <GovDatePickerController
                        name="hireDate"
                        control={control}
                        error={!!errors.hireDate}
                        rules={{ required: true }}
                    />
                    {errors.hireDate && <span className="text-red-600 text-sm">{t('common.required')}</span>}
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
        </div>
    )
}
