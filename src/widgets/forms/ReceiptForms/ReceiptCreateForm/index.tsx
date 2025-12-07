'use client'

import { useCreateReceipt } from '@/features/manage-receipts/model/useCreateReceipt'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useItems } from '@/features/manage-items/model/useItems'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useUnits } from '@/features/manage-units/model/useUnits'
import { useForm, useFieldArray } from 'react-hook-form'
import { ReceiptCreateRequest, ReceiptLineRequest } from '@/shared/api/generated/__swagger_client'
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
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ReceiptCreateForm() {
    const { t } = useTranslation()
    const { register, handleSubmit, control, formState: { errors, isSubmitting }, setValue } = useForm<ReceiptCreateRequest>({
        defaultValues: {
            lines: [{ itemId: '', quantity: 0, price: 0 }]
        },
        mode: 'onChange'
    })
    const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
    const { mutateAsync } = useCreateReceipt()
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    const { data: itemsData } = useItems({ page: 0, size: 100 })
    const { data: organizationsData } = useOrganizations({ page: 0, size: 100 })
    const { data: unitsData } = useUnits()
    const router = useRouter()

    const onSubmit = async (data: ReceiptCreateRequest) => {
        try {
            const created = await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/inventory/receipts/${created.id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('receipts.title'), href: '/inventory/receipts' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <GovLabel required>{t('documents.documentNumber')}</GovLabel>
                        <GovInput {...register('docNumber', { required: true })} />
                        {errors.docNumber && <span className="text-red-600 text-sm">{t('common.error')}</span>}
                    </div>

                    <div>
                        <GovLabel required>{t('documents.documentDate')}</GovLabel>
                        <GovDatePickerController
                            name="docDate"
                            control={control}
                            error={!!errors.docDate}
                            rules={{ required: true }}
                        />
                        {errors.docDate && <span className="text-red-600 text-sm">{t('common.error')}</span>}
                    </div>

                    <div>
                        <GovLabel>{t('documents.status')}</GovLabel>
                        <GovInput value="DRAFT" disabled className="bg-gray-50" />
                    </div>
                </div>

                <div>
                    <GovLabel required>{t('organization.title')}</GovLabel>
                    <Select onValueChange={(value) => setValue('organizationId', value, { shouldValidate: true })}>
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
                    {errors.organizationId && <span className="text-red-600 text-sm">{t('common.required')}</span>}
                </div>

                <div>
                    <GovLabel required>{t('documents.warehouse')}</GovLabel>
                    <Select onValueChange={(value) => setValue('warehouseId', value, { shouldValidate: true })}>
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
                    {errors.warehouseId && <span className="text-red-600 text-sm">{t('common.required')}</span>}
                </div>

                <div className="space-y-2">
                    <Label className="text-lg font-semibold">Строки документа</Label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-5 gap-2 items-end p-4 border rounded">
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
                                <Label>Ед. изм.</Label>
                                <Select onValueChange={(value) => setValue(`lines.${index}.unitId`, value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {unitsData?.map((unit: any) => (
                                            <SelectItem key={unit.id} value={unit.id!}>
                                                {unit.name}
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
                            <div>
                                <Label>Цена</Label>
                                <Input 
                                    type="number" 
                                    step="0.01"
                                    {...register(`lines.${index}.price`, { valueAsNumber: true })} 
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
                        onClick={() => append({ itemId: '', unitId: '', quantity: 0, price: 0 } as ReceiptLineRequest)}
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
