'use client'

import { useReceipt } from '@/features/manage-receipts/model/useReceipt'
import { useUpdateReceipt } from '@/features/manage-receipts/model/useUpdateReceipt'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useItems } from '@/features/manage-items/model/useItems'
import { useForm, useFieldArray } from 'react-hook-form'
import { ReceiptUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ReceiptEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: receipt, isLoading } = useReceipt(id)
    const { register, handleSubmit, control, formState: { errors, isSubmitting }, setValue } = useForm<ReceiptUpdateRequest>()
    const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
    const { mutateAsync } = useUpdateReceipt(id)
    const { data: warehousesData } = useWarehouses({ page: 0, size: 100 })
    const { data: itemsData } = useItems({ page: 0, size: 100 })
    const router = useRouter()

    useEffect(() => {
        if (receipt) {
            setValue('docNumber', receipt.docNumber)
            setValue('docDate', receipt.docDate)
            setValue('warehouseId', receipt.warehouseId)
            setValue('lines', receipt.lines || [])
        }
    }, [receipt, setValue])

    const onSubmit = async (data: ReceiptUpdateRequest) => {
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/inventory/receipts/${id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>
    if (receipt?.status !== 'DRAFT') {
        return <div className="p-6">Можно редактировать только черновики</div>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold">{t('receipts.editReceipt')}</h2>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>{t('documents.documentNumber')}</Label>
                    <Input {...register('docNumber', { required: true })} />
                </div>

                <div>
                    <Label>{t('documents.documentDate')}</Label>
                    <Input type="date" {...register('docDate', { required: true })} />
                </div>
            </div>

            <div>
                <Label>{t('documents.warehouse')}</Label>
                <Select 
                    defaultValue={receipt?.warehouseId}
                    onValueChange={(value) => setValue('warehouseId', value)}
                >
                    <SelectTrigger>
                        <SelectValue />
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

            <div className="space-y-2">
                <Label className="text-lg font-semibold">Строки документа</Label>
                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-4 gap-2 items-end p-4 border rounded">
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
                    onClick={() => append({ itemId: '', quantity: 0, price: 0 } as any)}
                >
                    Добавить строку
                </Button>
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('common.loading') : t('common.save')}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    {t('common.cancel')}
                </Button>
            </div>
        </form>
    )
}
