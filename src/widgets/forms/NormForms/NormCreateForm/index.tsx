'use client'

import { useCreateNorm } from '@/features/manage-norms/model/useCreateNorm'
import { useEmployeeCategories } from '@/features/manage-employee-categories/model/useEmployeeCategories'
import { useItems } from '@/features/manage-items/model/useItems'
import { useForm } from 'react-hook-form'
import { ItemSupplyNormCreateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function NormCreateForm() {
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<ItemSupplyNormCreateRequest>()
    const { mutateAsync } = useCreateNorm()
    const { data: categories } = useEmployeeCategories()
    const { data: itemsData } = useItems({ page: 0, size: 100 })
    const router = useRouter()

    const onSubmit = async (data: ItemSupplyNormCreateRequest) => {
        try {
            const created = await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/directories/norms/${created.id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold">Создать норму обеспечения</h2>
            
            <div>
                <Label>Категория сотрудников</Label>
                <Select onValueChange={(value) => setValue('employeeCategoryId', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((cat: any) => (
                            <SelectItem key={cat.id} value={cat.id!}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Номенклатура</Label>
                <Select onValueChange={(value) => setValue('itemId', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите номенклатуру" />
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
                    {...register('quantity', { required: true, valueAsNumber: true })} 
                />
                {errors.quantity && <span className="text-red-600 text-sm">{t('common.error')}</span>}
            </div>

            <div>
                <Label>Срок носки (месяцев)</Label>
                <Input 
                    type="number"
                    {...register('wearMonths', { required: true, valueAsNumber: true })} 
                />
                {errors.wearMonths && <span className="text-red-600 text-sm">{t('common.error')}</span>}
            </div>

            <div>
                <Label>Действует с</Label>
                <Input type="date" {...register('validFrom')} />
            </div>

            <div>
                <Label>Действует до</Label>
                <Input type="date" {...register('validTo')} />
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('common.loading') : t('common.create')}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    {t('common.cancel')}
                </Button>
            </div>
        </form>
    )
}
