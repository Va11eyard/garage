'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useItemGroup } from '@/features/manage-item-groups/model/useItemGroup'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function ItemGroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: itemGroup, isLoading } = useItemGroup(id)
  const { data: parentGroup } = useItemGroup(itemGroup?.parentId || '')

  if (isLoading) return <Spinner />
  if (!itemGroup) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('itemGroup.title'), href: '/directories/item-groups' },
        { label: itemGroup.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{itemGroup.name}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/item-groups')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/item-groups/${id}/edit`)}>
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
              <p className="text-sm text-gray-500">{t('itemGroup.code')}</p>
              <p className="font-medium">{itemGroup.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('itemGroup.name')}</p>
              <p className="font-medium">{itemGroup.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('itemGroup.parentGroup')}</p>
              <p className="font-medium">{parentGroup?.name || (itemGroup.parentId ? '-' : t('itemGroup.noParent'))}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={itemGroup.active ? 'text-green-600' : 'text-red-600'}>
                  {itemGroup.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
        </GovCardContent>
      </GovCard>
    </div>
  )
}
