'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { NormVersionDetails } from '@/widgets/details/NormVersionDetails'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function NormVersionDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string; versionId: string }> 
}) {
  const { id, versionId } = use(params)
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('norms.title'), href: '/directories/norms' },
        { label: t('common.view'), href: `/directories/norms/${id}` },
        { label: t('norms.versions'), href: `/directories/norms/${id}/versions` },
        { label: versionId }
      ]} />

      <div className="flex items-center gap-4">
        <GovButton variant="outline" onClick={() => router.push(`/directories/norms/${id}/versions`)}>
          {t('common.back')}
        </GovButton>
        <h1 className="text-3xl font-bold">{t('norms.versionDetails')}</h1>
      </div>

      <NormVersionDetails normId={id} versionId={versionId} />
    </div>
  )
}
