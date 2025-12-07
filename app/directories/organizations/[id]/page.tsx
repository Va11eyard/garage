'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useOrganization } from '@/features/manage-organizations/model/useOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function OrganizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: organization, isLoading } = useOrganization(id)

  if (isLoading) return <Spinner />
  if (!organization) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('organizations.title'), href: '/directories/organizations' },
        { label: organization.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{organization.name}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/organizations')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/organizations/${id}/edit`)}>
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
              <p className="text-sm text-gray-500">{t('organizations.code')}</p>
              <p className="font-medium">{organization.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('organizations.name')}</p>
              <p className="font-medium">{organization.name}</p>
            </div>
            {organization.shortName && (
              <div>
                <p className="text-sm text-gray-500">{t('organizations.shortName')}</p>
                <p className="font-medium">{organization.shortName}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={organization.active ? 'text-green-600' : 'text-red-600'}>
                  {organization.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
        </GovCardContent>
      </GovCard>
    </div>
  )
}
