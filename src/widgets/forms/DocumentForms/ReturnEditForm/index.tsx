'use client'

import { useReturn } from '@/features/manage-returns/model/useReturn'
import { useUpdateReturn } from '@/features/manage-returns/model/useUpdateReturn'
import { useWarehousesByOrganization } from '@/features/manage-warehouses/model/useWarehousesByOrganization'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useEmployeesSearch } from '@/features/manage-employees/model/useEmployeesSearch'
import { useItems } from '@/features/manage-items/model/useItems'
import { useForm, useFieldArray } from 'react-hook-form'
import { ReturnUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovDatePickerController } from '@/gov-design/components/Form'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ReturnEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: returnDoc, isLoading } = useReturn(id)
    const [selectedOrgId, setSelectedOrgId] = useState<string>()
    const { register, handleSubmit, control, formState: { isSubmitting }, setValue } = useForm<ReturnUpdateRequest>()
    const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
    const { mutateAsync } = useUpdateReturn(id)
    const { data: warehousesData } = useWarehousesByOrganization(selectedOrgId)
    const { data: organizationsData } = useOrganizations({ page: 0, size: 100 })
    const { data: employeesData } = useEmployeesSearch({ page: 0, size: 100 })
    const { data: itemsData } = useItems({ page: 0, size: 100 })

    useEffect(() => {
        if (returnDoc) {
            setValue('docNumber', returnDoc.docNumber)
            setValue('docDate', returnDoc.docDate)
            setValue('warehouseId', returnDoc.warehouseId)
            setValue('organizationId', returnDoc.organizationId)
            setValue('employeeId', returnDoc.employeeId)
            setValue('employeeFullName', returnDoc.employeeFullName)
            setValue('reason', returnDoc.reason)
            setValue('lines', returnDoc.lines || [])
            setSelectedOrgId(returnDoc.organizationId)
        }
    }, [returnDoc, setValue])

    const onSubmit = async (data: ReturnUpdateRequest) => {
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/inventory/return/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!returnDoc) return <div>{t('common.notFound')}</div>
    if (returnDoc?.status !== 'DRAFT') {
        return (
            <div className="space-y-6">
                <GovBreadcrumb items={[
                    { label: t('breadcrumbs.inventory'), href: '/inventory' },
                    { label: t('returns.title'), href: '/inventory/return' },
                    { label: returnDoc.docNumber || id }
                ]} />
                <GovCard>
                    <GovCardContent className="p-6">
                        <p>{t('receipts.onlyDraftsEditable')}</p>
                    </GovCardContent>
                </GovCard>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('returns.title'), href: '/inventory/return' },
                { label: returnDoc.docNumber || id, href: `/inventory/return/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('returns.editReturn')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <GovLabel>{t('documents.documentNumber')}</GovLabel>
                                <GovInput {...register('docNumber')} />
                            </div>

                            <div>
                                <GovLabel>{t('documents.documentDate')}</GovLabel>
                                <GovDatePickerController
                                    name="docDate"
                                    control={control}
                                />
                            </div>

                            <div>
                                <GovLabel>{t('documents.statusLabel')}</GovLabel>
                                <GovInput value={returnDoc?.status || 'DRAFT'} disabled className="bg-gray-50" />
                            </div>
                        </div>

                        <div>
                            <GovLabel>{t('organization.title')}</GovLabel>
                            <Select 
                                key={returnDoc?.organizationId}
                                defaultValue={returnDoc?.organizationId}
                                onValueChange={(value) => {
                                    setValue('organizationId', value)
                                    setSelectedOrgId(value)
                                    setValue('warehouseId', '')
                                }}
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
                        </div>

                        <div>
                            <GovLabel>{t('documents.warehouse')}</GovLabel>
                            <Select 
                                key={returnDoc?.warehouseId}
                                defaultValue={returnDoc?.warehouseId}
                                onValueChange={(value) => setValue('warehouseId', value)}
                                disabled={!selectedOrgId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={selectedOrgId ? t('warehouses.selectWarehouse') : t('common.selectOrganizationFirst')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {warehousesData?.map((wh: any) => (
                                        <SelectItem key={wh.id} value={wh.id!}>
                                            {wh.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <GovLabel>{t('employees.employee')}</GovLabel>
                            <Select 
                                key={returnDoc?.employeeId}
                                defaultValue={returnDoc?.employeeId}
                                onValueChange={(value) => {
                                    setValue('employeeId', value)
                                    const employee = employeesData?.content?.find((e: any) => e.id === value)
                                    if (employee) {
                                        const fullName = `${employee.lastName || ''} ${employee.firstName || ''} ${employee.middleName || ''}`.trim()
                                        setValue('employeeFullName', fullName)
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {employeesData?.content?.map((emp: any) => (
                                        <SelectItem key={emp.id} value={emp.id!}>
                                            {emp.lastName} {emp.firstName} {emp.middleName} - {emp.positionName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <GovLabel>{t('returns.returnReason')}</GovLabel>
                            <GovInput {...register('reason')} placeholder={t('returns.returnReason')} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-lg font-semibold">{t('receipts.documentLines')}</Label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-3 gap-2 items-end p-4 border rounded">
                                    <div>
                                        <Label>{t('items.item')}</Label>
                                        <Select 
                                            defaultValue={(field as any).itemId}
                                            onValueChange={(value) => setValue(`lines.${index}.itemId`, value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {itemsData?.content?.map((item: any) => (
                                                    <SelectItem key={item.id} value={item.id!}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>{t('receipts.quantity')}</Label>
                                        <Input 
                                            type="number" 
                                            step="0.01"
                                            {...register(`lines.${index}.quantity`, { valueAsNumber: true })} 
                                        />
                                    </div>
                                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                        {t('common.delete')}
                                    </Button>
                                </div>
                            ))}
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => append({ itemId: '', quantity: 0 } as any)}
                            >
                                {t('receipts.addLine')}
                            </Button>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <GovButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? t('common.loading') : t('common.save')}
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
