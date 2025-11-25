'use client'

import { useEmployee } from '@/features/manage-employees/model/useEmployee'
import { useTransferEmployee } from '@/features/manage-employees/model/useTransferEmployee'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useForm } from 'react-hook-form'
import { EmployeeTransferRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function EmployeeTransferForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: employee, isLoading } = useEmployee(id)
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<EmployeeTransferRequest>()
    const { mutateAsync } = useTransferEmployee(id)
    const { data: organizations } = useOrganizations({})
    const [selectedOrgId, setSelectedOrgId] = useState<string>('')
    const { data: orgUnits } = useOrgUnitsByOrganization(selectedOrgId)
    const router = useRouter()

    const onSubmit = async (data: EmployeeTransferRequest) => {
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/staff/employees/${id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>
    if (employee?.status !== 'ACTIVE') {
        return <div className="p-6">Можно перевести только активного сотрудника</div>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold">{t('employees.transferEmployee')}</h2>
            
            <div>
                <Label>{t('employees.organization')}</Label>
                <Select onValueChange={(value) => {
                    setValue('organizationId', value)
                    setSelectedOrgId(value)
                }}>
                    <SelectTrigger>
                        <SelectValue placeholder={t('organizations.selectOrganization')} />
                    </SelectTrigger>
                    <SelectContent>
                        {organizations?.map((org: any) => (
                            <SelectItem key={org.id} value={org.id!}>
                                {org.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>{t('employees.orgUnit')}</Label>
                <Select onValueChange={(value) => setValue('orgUnitId', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите подразделение" />
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
                <Label>Новая должность</Label>
                <Input {...register('positionName')} />
            </div>

            <div>
                <Label>Дата перевода</Label>
                <Input type="date" {...register('eventDate', { required: true })} />
                {errors.eventDate && <span className="text-red-600 text-sm">{t('common.error')}</span>}
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('common.loading') : t('employees.transferEmployee')}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    {t('common.cancel')}
                </Button>
            </div>
        </form>
    )
}
