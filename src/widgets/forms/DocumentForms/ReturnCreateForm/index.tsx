'use client'

import { useCreateReturn } from '@/features/manage-returns/model/useCreateReturn'
import { useWarehousesByOrganization } from '@/features/manage-warehouses/model/useWarehousesByOrganization'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useEmployeesSearch } from '@/features/manage-employees/model/useEmployeesSearch'
import { useItems } from '@/features/manage-items/model/useItems'
import { useForm, useFieldArray } from 'react-hook-form'
import { ReturnCreateRequest, ReturnLineCreateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovDatePickerController } from '@/gov-design/components/Form'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ReturnCreateForm() {
    const { t } = useTranslation()
    const [selectedOrgId, setSelectedOrgId] = useState<string>()
    const { register, handleSubmit, control, formState: { errors, isSubmitting }, setValue } = useForm<ReturnCreateRequest>({
        defaultValues: {
            lines: [{ itemId: '', quantity: 0 }]
        }
    })
    const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
    const { mutateAsync } = useCreateReturn()
    const { data: warehousesData } = useWarehousesByOrganization(selectedOrgId)
    const { data: organizationsData } = useOrganizations({ page: 0, size: 100 })
    const { data: employeesData } = useEmployeesSearch({ page: 0, size: 100 })
    const { data: itemsData } = useItems({ page: 0, size: 100 })
    const router = useRouter()

    const onSubmit = async (data: ReturnCreateRequest) => {
        try {
            const created = await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/inventory/return/${created.id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('returns.title'), href: '/inventory/return' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <GovLabel>{t('documents.documentNumber')}</GovLabel>
                        <GovInput {...register('docNumber')} />
                    </div>

                    <div>
                        <GovLabel required>{t('documents.documentDate')}</GovLabel>
                        <GovDatePickerController
                            name="docDate"
                            control={control}
                            rules={{ required: true }}
                            error={!!errors.docDate}
                        />
                        {errors.docDate && <span className="text-red-600 text-sm">{t('common.required')}</span>}
                    </div>

                    <div>
                        <GovLabel>{t('documents.statusLabel')}</GovLabel>
                        <GovInput value="DRAFT" disabled className="bg-gray-50" />
                    </div>
                </div>

                <div>
                    <GovLabel>{t('organization.title')}</GovLabel>
                    <Select onValueChange={(value) => {
                        setValue('organizationId', value)
                        setSelectedOrgId(value)
                        setValue('warehouseId', '')
                    }}>
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
                    <GovLabel>Сотрудник</GovLabel>
                    <Select onValueChange={(value) => {
                        setValue('employeeId', value)
                        const employee = employeesData?.content?.find((e: any) => e.id === value)
                        if (employee) {
                            const fullName = `${employee.lastName || ''} ${employee.firstName || ''} ${employee.middleName || ''}`.trim()
                            setValue('employeeFullName', fullName)
                        }
                    }}>
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
                    <GovLabel>Причина возврата</GovLabel>
                    <GovInput {...register('reason')} placeholder="Причина возврата" />
                </div>

                <div className="space-y-2">
                    <Label className="text-lg font-semibold">Строки документа</Label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-3 gap-2 items-end p-4 border rounded">
                            <div>
                                <Label>Номенклатура</Label>
                                <Select onValueChange={(value) => setValue(`lines.${index}.itemId`, value)}>
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
                                <Label>Количество</Label>
                                <Input 
                                    type="number" 
                                    step="0.01"
                                    {...register(`lines.${index}.quantity`, { valueAsNumber: true })} 
                                />
                            </div>
                            <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                Удалить
                            </Button>
                        </div>
                    ))}
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => append({ itemId: '', quantity: 0 } as ReturnLineCreateRequest)}
                    >
                        Добавить строку
                    </Button>
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
