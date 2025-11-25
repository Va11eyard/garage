'use client'

import { useCreateItem } from '@/features/manage-items/model/useCreateItem'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useUnits } from '@/features/manage-units/model/useUnits'
import { useForm } from 'react-hook-form'
import { ItemCreateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function ItemCreateForm() {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ItemCreateRequest>()
  const { mutateAsync } = useCreateItem()
  const { data: groups } = useItemGroups()
  const { data: units } = useUnits({})
  const router = useRouter()

  const onSubmit = async (data: ItemCreateRequest) => {
    try {
      const created = await mutateAsync(data)
      toast.success(t('common.success'))
      router.push(`/directories/items/${created.id}`)
    } catch {
      toast.error(t('common.error'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">{t('items.createItem')}</h2>
      <div>
        <Label>{t('items.name')}</Label>
        <Input {...register('name', { required: true })} />
        {errors.name && <span className="text-red-600">{t('common.error')}</span>}
      </div>
      <div>
        <Label>{t('items.code')}</Label>
        <Input {...register('code', { required: true })} />
        {errors.code && <span className="text-red-600">{t('common.error')}</span>}
      </div>
      <div>
        <Label>{t('items.itemGroup')}</Label>
        <select {...register('groupId')} className="w-full border rounded px-3 py-2">
          <option value="">{t('items.itemGroup')}</option>
          {groups?.map((g: any) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        {errors.groupId && <span className="text-red-600">{t('common.error')}</span>}
      </div>
      <div>
        <Label>{t('items.unitOfMeasure')}</Label>
        <select {...register('baseUnitId', { required: true })} className="w-full border rounded px-3 py-2">
          <option value="">{t('items.unitOfMeasure')}</option>
          {units?.content?.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        {errors.baseUnitId && <span className="text-red-600">{t('common.error')}</span>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner className="w-4 h-4" /> : t('common.create')}
      </Button>
    </form>
  )
}