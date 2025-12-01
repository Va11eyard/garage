'use client'

import { useItem } from '@/features/manage-items/model/useItem'
import { useUpdateItem } from '@/features/manage-items/model/useUpdateItem'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useUnits } from '@/features/manage-units/model/useUnits'
import { useForm } from 'react-hook-form'
import { ItemUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ItemEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data, isLoading } = useItem(id)
    const { mutateAsync } = useUpdateItem()
    const { data: groups } = useItemGroups()
    const { data: units } = useUnits()
    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<ItemUpdateRequest>()

    const router = useRouter()
    useEffect(() => {
        if (data) {
            setValue('name', data.name)
            setValue('groupId', data.groupId)
            setValue('baseUnitId', data.baseUnitId)
            setValue('barcode', data.barcode)
            setValue('weightKg', data.weightKg)
            setValue('volumeM3', data.volumeM3)
            setValue('active', data.active)
        }
    }, [data, setValue])

    if (isLoading) return <Spinner />

    const onSubmit = async (update: ItemUpdateRequest) => {
        try {
            await mutateAsync({ id, data: update })
            toast.success(t('common.success'))
            router.push(`/directories/items/${id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">{t('items.editItem')}</h2>
            <div>
                <Label>{t('items.code')}</Label>
                <Input value={data?.code} disabled className="bg-gray-100" />
                <p className="text-xs text-gray-500 mt-1">Код нельзя изменить</p>
            </div>
            <div>
                <Label>{t('items.name')}</Label>
                <Input {...register('name', { required: true })} />
            </div>
            <div>
                <Label>{t('items.itemGroup')}</Label>
                <select {...register('groupId')} className="w-full border rounded px-3 py-2">
                    <option value="">{t('items.itemGroup')}</option>
                    {groups?.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
            </div>
            <div>
                <Label>{t('items.unitOfMeasure')}</Label>
                <select {...register('baseUnitId', { required: true })} className="w-full border rounded px-3 py-2">
                    <option value="">{t('items.unitOfMeasure')}</option>
                    {units?.content?.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
            </div>
            <div>
                <Label>Штрихкод</Label>
                <Input {...register('barcode')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Вес (кг)</Label>
                    <Input type="number" step="0.01" {...register('weightKg')} />
                </div>
                <div>
                    <Label>Объем (м³)</Label>
                    <Input type="number" step="0.001" {...register('volumeM3')} />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" {...register('active')} id="active" className="w-4 h-4" />
                <Label htmlFor="active" className="mb-0">Активен</Label>
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner className="w-4 h-4" /> : t('common.save')}
            </Button>
        </form>
    )
}
