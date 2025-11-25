'use client'

import { useItemGroup } from '@/features/manage-item-groups/model/useItemGroup'
import { useUpdateItemGroup } from '@/features/manage-item-groups/model/useUpdateItemGroup'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useForm } from 'react-hook-form'
import { ItemGroupUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Checkbox } from '@/shared/ui/checkbox'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ItemGroupEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: itemGroup, isLoading } = useItemGroup(id)
    const { data: itemGroups } = useItemGroups()
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<ItemGroupUpdateRequest>()
    const { mutateAsync } = useUpdateItemGroup(id)
    const router = useRouter()

    const active = watch('active')

    useEffect(() => {
        if (itemGroup) {
            setValue('name', itemGroup.name)
            setValue('parentId', itemGroup.parentId || undefined)
            setValue('active', itemGroup.active ?? true)
        }
    }, [itemGroup, setValue])

    const onSubmit = async (data: ItemGroupUpdateRequest) => {
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/directories/item-groups/${id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold">{t('itemGroup.editGroup')}</h2>
            
            <div>
                <Label>{t('itemGroup.name')}</Label>
                <Input {...register('name', { required: true })} />
                {errors.name && <span className="text-red-600 text-sm">{t('common.error')}</span>}
            </div>

            <div>
                <Label>{t('itemGroup.parentGroup')}</Label>
                <Select 
                    defaultValue={itemGroup?.parentId || ''}
                    onValueChange={(value) => setValue('parentId', value || undefined)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={t('itemGroup.parentGroup')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Нет (корневая группа)</SelectItem>
                        {itemGroups?.filter((g: any) => g.id !== id).map((group: any) => (
                            <SelectItem key={group.id} value={group.id!}>
                                {group.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
