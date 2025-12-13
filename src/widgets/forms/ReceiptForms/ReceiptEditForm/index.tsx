'use client'

import { useReceipt } from '@/features/manage-receipts/model/useReceipt'
import { useUpdateReceipt } from '@/features/manage-receipts/model/useUpdateReceipt'
import { useWarehousesByOrganization } from '@/features/manage-warehouses/model/useWarehousesByOrganization'
import { useItems } from '@/features/manage-items/model/useItems'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useUnits } from '@/features/manage-units/model/useUnits'
import { useForm, useFieldArray } from 'react-hook-form'
import { ReceiptUpdateRequest } from '@/shared/api/generated/__swagger_client'
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

export function ReceiptEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: receipt, isLoading } = useReceipt(id)
    const [selectedOrgId, setSelectedOrgId] = useState<string>()
    const { register, handleSubmit, control, formState: { isSubmitting }, setValue } = useForm<ReceiptUpdateRequest>()
    const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
    const { mutateAsync } = useUpdateReceipt(id)
    const { data: warehousesData } = useWarehousesByOrganization(selectedOrgId)
    const { data: itemsData } = useItems({ page: 0, size: 100 })
    const { data: organizationsData } = useOrganizations({ page: 0, size: 100 })
    const { data: unitsData } = useUnits()

    useEffect(() => {
        if (receipt) {
            setValue('docNumber', receipt.docNumber)
            setValue('docDate', receipt.docDate)
            setValue('warehouseId', receipt.warehouseId)
            setValue('organizationId', receipt.organizationId)
            setValue('lines', receipt.lines || [])
            setSelectedOrgId(receipt.organizationId)
        }
    }, [receipt, setValue])

    const onSubmit = async (data: ReceiptUpdateRequest) => {
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/inventory/receipts/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!receipt) return <div>{t('common.notFound')}</div>
    if (receipt?.status !== 'DRAFT') {
        return (
            <div className="space-y-6">
                <GovBreadcrumb items={[
                    { label: t('breadcrumbs.inventory'), href: '/inventory' },
                    { label: t('receipts.title'), href: '/inventory/receipts' },
                    { label: receipt.docNumber || id }
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
                { label: t('receipts.title'), href: '/inventory/receipts' },
                { label: receipt.docNumber || id, href: `/inventory/receipts/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('receipts.editReceipt')}</GovCardTitle>
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
                                <GovLabel>{t('documents.statusLabel')}</GovLabel>
                                <GovInput value={receipt?.status || 'DRAFT'} disabled className="bg-gray-50" />
                            </div>
                        </div>

                        <div>
                            <GovLabel required>{t('organization.title')}</GovLabel>
                            <Select 
                                key={receipt?.organizationId}
                                defaultValue={receipt?.organizationId}
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
                            <GovLabel required>{t('documents.warehouse')}</GovLabel>
                            <Select 
                                key={receipt?.warehouseId}
                                defaultValue={receipt?.warehouseId}
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

                        <div className="space-y-2">
                            <Label className="text-lg font-semibold">{t('receipts.documentLines')}</Label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-5 gap-2 items-end p-4 border rounded">
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
                                        <Label>{t('receipts.unit')}</Label>
                                        <Select 
                                            defaultValue={(field as any).unitId}
                                            onValueChange={(value) => setValue(`lines.${index}.unitId`, value)}
                                        >
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
                                        <Label>{t('receipts.quantity')}</Label>
                                        <Input 
                                            type="number" 
                                            step="0.01"
                                            {...register(`lines.${index}.quantity`, { required: true, valueAsNumber: true })} 
                                        />
                                    </div>
                                    <div>
                                        <Label>{t('receipts.price')}</Label>
                                        <Input 
                                            type="number" 
                                            step="0.01"
                                            {...register(`lines.${index}.price`, { valueAsNumber: true })} 
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
                                onClick={() => append({ itemId: '', unitId: '', quantity: 0, price: 0 } as any)}
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
