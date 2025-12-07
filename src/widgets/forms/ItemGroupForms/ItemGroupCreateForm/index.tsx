'use client'

import { useCreateItemGroup } from '@/features/manage-item-groups/model/useCreateItemGroup'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useForm } from 'react-hook-form'
import { ItemGroupCreateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ItemGroupCreateForm() {
    const { t } = useTranslation()
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<ItemGroupCreateRequest>()
    const { mutateAsync } = useCreateItemGroup()
    const { data: itemGroups } = useItemGroups()
    const router = useRouter()

    const onSubmit = async (data: ItemGroupCreateRequest) => {
        try {
            const created = await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/directories/item-groups/${created.id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold">{t('itemGroup.createGroup')}</h2>
            
            <div>
                <Label>{t('itemGroup.code')}</Label>
                <Input {...register('code', { required: true })} />
                {errors.code && <span className="text-red-600 text-sm">{t('common.error')}</span>}
            </div>

            <div>
                <Label>{t('itemGroup.name')}</Label>
                <Input {...register('name', { required: true })} />
                {errors.name && <span className="text-red-600 text-sm">{t('common.error')}</span>}
            </div>

            <div>
                <Label>{t('itemGroup.parentGroup')}</Label>
                <Select 
                    defaultValue="__NONE__"
                    onValueChange={(value) => setValue('parentId', value === '__NONE__' ? undefined : value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={t('itemGroup.noParent')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__NONE__">{t('itemGroup.noParent')}</SelectItem>
                        {itemGroups?.map((group: any) => (
                            <SelectItem key={group.id} value={group.id!}>
                                {group.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="active"
                    defaultChecked={true}
                    {...register('active')}
                    className="w-4 h-4"
                />
                <Label htmlFor="active" className="mb-0">{t('common.active')}</Label>
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
