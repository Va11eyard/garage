'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { NormVersionsList } from '@/widgets/lists/NormVersionsList'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function NormVersionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('norms.title'), href: '/directories/norms' },
        { label: t('common.view'), href: `/directories/norms/${id}` },
        { label: t('norms.versions') }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('norms.versions')}</h1>
        <GovButton variant="outline" onClick={() => router.push(`/directories/norms/${id}`)}>
          {t('common.back')}
        </GovButton>
      </div>

      <NormVersionsList normId={id} />
    </div>
  )
}
