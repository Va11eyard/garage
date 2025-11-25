'use client'

import { useNorm } from '@/features/manage-norms/model/useNorm'
import { useUpdateNorm } from '@/features/manage-norms/model/useUpdateNorm'
import { useEmployeeCategories } from '@/features/manage-employee-categories/model/useEmployeeCategories'
import { useItems } from '@/features/manage-items/model/useItems'
import { useForm } from 'react-hook-form'
import { ItemSupplyNormUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Checkbox } from '@/shared/ui/checkbox'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function NormEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: norm, isLoading } = useNorm(id)
    const { data: categories } = useEmployeeCategories()
    const { data: itemsData } = useItems({ page: 0, size: 100 })
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<ItemSupplyNormUpdateRequest>()
    const { mutateAsync } = useUpdateNorm(id)
    const router = useRouter()

    const active = watch('active')

    useEffect(() => {
        if (norm) {
            setValue('quantity', norm.quantity)
            setValue('wearMonths', norm.wearMonths)
            setValue('validFrom', norm.validFrom)
            setValue('validTo', norm.validTo)
            setValue('active', norm.active ?? true)
        }
    }, [norm, setValue])

    const onSubmit = async (data: ItemSupplyNormUpdateRequest) => {
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/directories/norms/${id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold">Редактировать норму</h2>
            
            <div>
                <Label>Количество</Label>
                <Input 
                    type="number" 
                    step="0.01"
                    {...register('quantity', { required: true, valueAsNumber: true })} 
                />
            </div>

            <div>
                <Label>Срок носки (месяцев)</Label>
                <Input 
                    type="number"
                    {...register('wearMonths', { required: true, valueAsNumber: true })} 
                />
            </div>

            <div>
                <Label>Действует с</Label>
                <Input type="date" {...register('validFrom')} />
            </div>

            <div>
                <Label>Действует до</Label>
                <Input type="date" {...register('validTo')} />
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="active"
                    checked={active}
                    onCheckedChange={(checked) => setValue('active', checked as boolean)}
                />
                <Label htmlFor="active">{t('common.active')}</Label>
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
