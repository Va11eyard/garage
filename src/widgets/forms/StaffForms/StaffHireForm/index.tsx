'use client'

import { useHireStaff } from '@/features/hire-staff/model/useHireStaff'
import { usePersons } from '@/features/manage-persons/model/usePersons'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnits } from '@/features/manage-org-units/model/useOrgUnits'
import { useForm } from 'react-hook-form'
import { EmployeeHireRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function StaffHireForm() {
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<EmployeeHireRequest>()
    const { mutateAsync } = useHireStaff()
    const router = useRouter()

    const [organizationId, setOrganizationId] = useState<string>('')

    const { data: persons } = usePersons({ page: 0, size: 100 })
    const { data: organizations } = useOrganizations({ page: 0, size: 100 })
    const { data: orgUnits } = useOrgUnits({ organizationId: organizationId, page: 0, size: 100 })


    const onSubmit = async (data: EmployeeHireRequest) => {
        try {
            const hired = await mutateAsync(data)
            toast.success(t('common.success'))
            router.push('/staff')
        } catch {
            toast.error(t('common.error'))
        }
    }

    const selectedOrgId = watch('organizationId');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">{t('staff.hire')}</h2>

            <div>
                <Label>{t('staff.person')}</Label>
                <select {...register('personId', { required: true })} className="w-full border rounded px-3 py-2">
                    <option value="">{t('staff.selectPerson')}</option>
                    {persons?.content?.map((p: any) => <option key={p.id} value={p.id}>{`${p.lastName} ${p.firstName} ${p.middleName}`}</option>)}
                </select>
                {errors.personId && <span className="text-red-600">{t('common.error')}</span>}
            </div>

            <div>
                <Label>{t('staff.organization')}</Label>
                <select {...register('organizationId', { required: true })}
                        onChange={(e) => setOrganizationId(e.target.value)}
                        className="w-full border rounded px-3 py-2">
                    <option value="">{t('staff.selectOrganization')}</option>
                    {organizations?.content?.map((o: any) => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
                {errors.organizationId && <span className="text-red-600">{t('common.error')}</span>}
            </div>

            <div>
                <Label>{t('staff.orgUnit')}</Label>
                <select {...register('orgUnitId')} className="w-full border rounded px-3 py-2" disabled={!selectedOrgId}>
                    <option value="">{t('staff.selectOrgUnit')}</option>
                    {orgUnits?.content?.map((ou: any) => <option key={ou.id} value={ou.id}>{ou.name}</option>)}
                </select>
            </div>

            <div>
                <Label>{t('staff.personnelNumber')}</Label>
                <Input {...register('personnelNumber', { required: true })} />
                {errors.personnelNumber && <span className="text-red-600">{t('common.error')}</span>}
            </div>

            <div>
                <Label>{t('staff.positionName')}</Label>
                <Input {...register('positionName')} />
            </div>

            <div>
                <Label>{t('staff.rankName')}</Label>
                <Input {...register('rankName')} />
            </div>

            <div>
                <Label>{t('staff.hireDate')}</Label>
                <Input {...register('hireDate', { required: true })} type="date" />
                {errors.hireDate && <span className="text-red-600">{t('common.error')}</span>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : t('common.create')}
            </Button>
        </form>
    )
}
