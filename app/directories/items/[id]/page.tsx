'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useItem } from '@/features/manage-items/model/useItem'
import { useItemGroup } from '@/features/manage-item-groups/model/useItemGroup'
import { useUnit } from '@/features/manage-units/model/useUnit'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: item, isLoading } = useItem(id)
  const { data: itemGroup } = useItemGroup(item?.groupId || '')
  const { data: unit } = useUnit(item?.baseUnitId || '')

  if (isLoading) return <Spinner />
  if (!item) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('items.title'), href: '/directories/items' },
        { label: item.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{item.name}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/items')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/items/${id}/edit`)}>
            {t('common.edit')}
          </GovButton>
        </div>
      </div>

      <GovCard>
        <GovCardHeader>
          <GovCardTitle>{t('common.details')}</GovCardTitle>
        </GovCardHeader>
        <GovCardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t('items.code')}</p>
              <p className="font-medium">{item.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('items.name')}</p>
              <p className="font-medium">{item.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('items.itemGroup')}</p>
              <p className="font-medium">{itemGroup?.name || item.groupCode || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('items.unitOfMeasure')}</p>
              <p className="font-medium">{unit?.name || item.baseUnitCode || '-'}</p>
            </div>
            {item.barcode && (
              <div>
                <p className="text-sm text-gray-500">{t('items.barcode')}</p>
                <p className="font-medium">{item.barcode}</p>
              </div>
            )}
            {item.weightKg && (
              <div>
                <p className="text-sm text-gray-500">{t('items.weightKg')}</p>
                <p className="font-medium">{item.weightKg} кг</p>
              </div>
            )}
            {item.volumeM3 && (
              <div>
                <p className="text-sm text-gray-500">{t('items.volumeM3')}</p>
                <p className="font-medium">{item.volumeM3} м³</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={item.active ? 'text-green-600' : 'text-red-600'}>
                  {item.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
          {item.barcode && (
            <div>
              <p className="text-sm text-gray-500">{t('items.barcode')}</p>
              <p className="font-medium">{item.barcode}</p>
            </div>
          )}
        </GovCardContent>
      </GovCard>
    </div>
  )
}
