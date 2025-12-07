'use client'

import { useIssue } from '@/features/manage-issues/model/useIssue'
import { useUpdateIssue } from '@/features/manage-issues/model/useUpdateIssue'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useEmployeesSearch } from '@/features/manage-employees/model/useEmployeesSearch'
import { useItems } from '@/features/manage-items/model/useItems'
import { useForm, useFieldArray } from 'react-hook-form'
import { IssueUpdateRequest } from '@/shared/api/generated/__swagger_client'
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
import { useEffect } from 'react'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function IssueEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: issue, isLoading } = useIssue(id)
    const { register, handleSubmit, control, formState: { isSubmitting }, setValue } = useForm<IssueUpdateRequest>()
    const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
    const { mutateAsync } = useUpdateIssue(id)
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    const { data: organizationsData } = useOrganizations({ page: 0, size: 100 })
    const { data: employeesData } = useEmployeesSearch({ page: 0, size: 100 })
    const { data: itemsData } = useItems({ page: 0, size: 100 })

    useEffect(() => {
        if (issue) {
            setValue('docNumber', issue.docNumber)
            setValue('docDate', issue.docDate)
            setValue('warehouseId', issue.warehouseId)
            setValue('organizationId', issue.organizationId)
            setValue('employeeId', issue.employeeId)
            setValue('employeeFullName', issue.employeeFullName)
            setValue('employeePosition', issue.employeePosition)
            setValue('employeeCategory', issue.employeeCategory)
            setValue('comment', issue.comment)
            setValue('lines', issue.lines || [])
        }
    }, [issue, setValue])

    const onSubmit = async (data: IssueUpdateRequest) => {
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/inventory/issue/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!issue) return <div>{t('common.notFound')}</div>
    if (issue?.status !== 'DRAFT') {
        return (
            <div className="space-y-6">
                <GovBreadcrumb items={[
                    { label: t('breadcrumbs.inventory'), href: '/inventory' },
                    { label: t('issues.title'), href: '/inventory/issue' },
                    { label: issue.docNumber || id }
                ]} />
                <GovCard>
                    <GovCardContent className="p-6">
                        <p>Можно редактировать только черновики</p>
                    </GovCardContent>
                </GovCard>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('issues.title'), href: '/inventory/issue' },
                { label: issue.docNumber || id, href: `/inventory/issue/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('issues.editIssue')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <GovLabel required>{t('documents.documentNumber')}</GovLabel>
                                <GovInput {...register('docNumber', { required: true })} />
                            </div>

                            <div>
                                <GovLabel required>{t('documents.documentDate')}</GovLabel>
                                <GovDatePickerController
                                    name="docDate"
                                    control={control}
                                    required
                                />
                            </div>

                            <div>
                                <GovLabel>{t('documents.status')}</GovLabel>
                                <GovInput value={issue?.status || 'DRAFT'} disabled className="bg-gray-50" />
                            </div>
                        </div>

                        <div>
                            <GovLabel required>{t('organization.title')}</GovLabel>
                            <Select 
                                key={issue?.organizationId}
                                defaultValue={issue?.organizationId}
                                onValueChange={(value) => setValue('organizationId', value)}
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
                            <GovLabel required>{t('documents.warehouse')}</GovLabel>
                            <Select 
                                key={issue?.warehouseId}
                                defaultValue={issue?.warehouseId}
                                onValueChange={(value) => setValue('warehouseId', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('warehouses.selectWarehouse')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {warehousesData?.content?.map((wh: any) => (
                                        <SelectItem key={wh.id} value={wh.id!}>
                                            {wh.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <GovLabel required>Сотрудник</GovLabel>
                            <Select 
                                key={issue?.employeeId}
                                defaultValue={issue?.employeeId}
                                onValueChange={(value) => {
                                    setValue('employeeId', value)
                                    const employee = employeesData?.content?.find((e: any) => e.id === value)
                                    if (employee) {
                                        const fullName = `${employee.lastName || ''} ${employee.firstName || ''} ${employee.middleName || ''}`.trim()
                                        setValue('employeeFullName', fullName)
                                        setValue('employeePosition', employee.positionName || '')
                                        setValue('employeeCategory', employee.categoryName || '')
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

                        <div className="space-y-2">
                            <Label className="text-lg font-semibold">Строки документа</Label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-3 gap-2 items-end p-4 border rounded">
                                    <div>
                                        <Label>Номенклатура</Label>
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
                                        <Label>Количество</Label>
                                        <Input 
                                            type="number" 
                                            step="0.01"
                                            {...register(`lines.${index}.quantity`, { required: true, valueAsNumber: true })} 
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
                                onClick={() => append({ itemId: '', quantity: 0 } as any)}
                            >
                                Добавить строку
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
