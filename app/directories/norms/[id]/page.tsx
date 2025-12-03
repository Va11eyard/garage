'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useNorm } from '@/features/manage-norms/model/useNorm'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function NormDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: norm, isLoading } = useNorm(id)

  if (isLoading) return <Spinner />
  if (!norm) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('norms.title'), href: '/directories/norms' },
        { label: norm.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{norm.name}</h1>
        <div className="flex gap-2">
          <GovButton onClick={() => router.push(`/directories/norms/${id}/edit`)}>
            {t('common.edit')}
          </GovButton>
          <GovButton variant="outline" onClick={() => router.push(`/directories/norms/${id}/versions`)}>
            {t('norms.versions')}
          </GovButton>
        </div>
      </div>

      <GovCard>
        <GovCardHeader>
          <GovCardTitle>{t('common.details')}</GovCardTitle>
        </GovCardHeader>
        <GovCardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">{t('common.code')}</p>
            <p className="font-medium">{norm.code}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('common.name')}</p>
            <p className="font-medium">{norm.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('common.description')}</p>
            <p className="font-medium">{norm.description || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('common.status')}</p>
            <p className="font-medium">
              <span className={norm.active ? 'text-green-600' : 'text-red-600'}>
                {norm.active ? t('common.active') : t('common.inactive')}
              </span>
            </p>
          </div>
        </GovCardContent>
      </GovCard>
    </div>
  )
}
