'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useItemSupplyNorm } from '@/features/manage-item-supply-norms/model/useItemSupplyNorm'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function ItemSupplyNormDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: norm, isLoading } = useItemSupplyNorm(id)

  if (isLoading) return <Spinner />
  if (!norm) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('itemSupplyNorm.title'), href: '/directories/item-supply-norms' },
        { label: norm.employeeCategoryName || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{norm.employeeCategoryName} - {norm.itemName}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/item-supply-norms')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/item-supply-norms/${id}/edit`)}>
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
              <p className="text-sm text-gray-500">{t('norm.category')}</p>
              <p className="font-medium">{norm.employeeCategoryName || '-'}</p>
              <p className="text-xs text-gray-400">{norm.employeeCategoryCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('norm.item')}</p>
              <p className="font-medium">{norm.itemName || '-'}</p>
              <p className="text-xs text-gray-400">{norm.itemCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('norm.quantity')}</p>
              <p className="font-medium">{norm.quantity ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('itemSupplyNorm.wearMonths')}</p>
              <p className="font-medium">{norm.wearMonths ? `${norm.wearMonths} ${t('common.months')}` : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('itemSupplyNorm.validFrom')}</p>
              <p className="font-medium">{norm.validFrom ? new Date(norm.validFrom).toLocaleDateString() : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('itemSupplyNorm.validTo')}</p>
              <p className="font-medium">{norm.validTo ? new Date(norm.validTo).toLocaleDateString() : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={norm.active ? 'text-green-600' : 'text-red-600'}>
                  {norm.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
        </GovCardContent>
      </GovCard>
    </div>
  )
}
