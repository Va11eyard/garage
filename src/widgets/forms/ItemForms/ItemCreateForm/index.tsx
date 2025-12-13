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
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ItemCreateForm() {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ItemCreateRequest>()
  const { mutateAsync } = useCreateItem()
  const { data: groups } = useItemGroups()
  const { data: units } = useUnits()
  const router = useRouter()

  const onSubmit = async (data: ItemCreateRequest) => {
    try {
      const created = await mutateAsync(data)
      toast.success(t('common.success'))
      router.push(`/directories/items/${created.id}`)
    } catch (error) {
      toast.error(getErrorMessage(error))
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
          {(Array.isArray(units) ? units : []).map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        {errors.baseUnitId && <span className="text-red-600">{t('common.error')}</span>}
      </div>
      <div>
        <Label>{t('items.barcode')}</Label>
        <Input {...register('barcode')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>{t('items.weightKg')}</Label>
          <Input {...register('weightKg', { valueAsNumber: true })} type="number" step="0.01" placeholder="0.00" />
        </div>
        <div>
          <Label>{t('items.volumeM3')}</Label>
          <Input {...register('volumeM3', { valueAsNumber: true })} type="number" step="0.001" placeholder="0.000" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          {...register('active')} 
          id="active" 
          className="w-4 h-4"
          defaultChecked={true}
        />
        <Label htmlFor="active" className="mb-0">{t('common.active')}</Label>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner className="w-4 h-4" /> : t('common.create')}
      </Button>
    </form>
  )
}