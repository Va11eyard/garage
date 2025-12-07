'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useQualityCategory } from '@/features/manage-quality-categories/model/useQualityCategory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function QualityCategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: category, isLoading } = useQualityCategory(id)

  if (isLoading) return <Spinner />
  if (!category) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('qualityCategory.title'), href: '/directories/quality-categories' },
        { label: category.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/quality-categories')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/quality-categories/${id}/edit`)}>
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
              <p className="text-sm text-gray-500">{t('qualityCategory.code')}</p>
              <p className="font-medium">{category.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('qualityCategory.name')}</p>
              <p className="font-medium">{category.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={category.active ? 'text-green-600' : 'text-red-600'}>
                  {category.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
          {category.description && (
            <div>
              <p className="text-sm text-gray-500">{t('qualityCategory.description')}</p>
              <p className="font-medium">{category.description}</p>
            </div>
          )}
        </GovCardContent>
      </GovCard>
    </div>
  )
}
