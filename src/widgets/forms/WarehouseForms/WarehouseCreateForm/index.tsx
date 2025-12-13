'use client'

import { useCreateWarehouse } from '@/features/manage-warehouses/model/useCreateWarehouse'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnits } from '@/features/manage-org-units/model/useOrgUnits'
import { useForm } from 'react-hook-form'
import { WarehouseCreateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function WarehouseCreateForm() {
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WarehouseCreateRequest>()
    const { mutateAsync } = useCreateWarehouse()
    const router = useRouter()
    const [organizationId, setOrganizationId] = useState('')
    const { data: organizations } = useOrganizations({})
    const { data: orgUnits } = useOrgUnits({ organizationId })

    const onSubmit = async (data: WarehouseCreateRequest) => {
        try {
            const created = await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/directories/warehouses/${created.id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">{t('warehouses.createWarehouse')}</h2>
            <div>
                <Label>{t('warehouses.name')}</Label>
                <Input {...register('name', { required: true })} />
                {errors.name && <span className="text-red-600">{t('common.error')}</span>}
            </div>
            <div>
                <Label>{t('warehouses.code')}</Label>
                <Input {...register('code', { required: true })} />
                {errors.code && <span className="text-red-600">{t('common.error')}</span>}
            </div>
            <div>
                <Label>{t('organizations.title')}</Label>
                <select
                    {...register('organizationId', { required: true })}
                    value={organizationId}
                    onChange={e => setOrganizationId(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">{t('warehouses.selectOrganization')}</option>
                    {(organizations?.content || []).map((o: any) => (
                        <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                </select>
                {errors.organizationId && <span className="text-red-600">{t('common.error')}</span>}
            </div>
            <div>
                <Label>{t('orgUnits.title')}</Label>
                <select {...register('orgUnitId')}
                        disabled={!organizationId}
                        className="w-full border rounded px-3 py-2"
                >
                    <option value="">{t('warehouses.selectOrgUnit')}</option>
                    {(Array.isArray(orgUnits) ? orgUnits : []).map((ou: any) => (
                        <option key={ou.id} value={ou.id}>{ou.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <Label>{t('warehouses.address')}</Label>
                <Input {...register('address')} />
            </div>
            <div>
                <Label>{t('warehouses.description')}</Label>
                <Input {...register('description')} />
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : t('common.create')}
            </Button>
        </form>
    )
}
