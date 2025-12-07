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
          <GovButton variant="outline" onClick={() => router.push('/directories/norms')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/norms/${id}/edit`)}>
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
              <p className="text-sm text-gray-500">{t('common.code')}</p>
              <p className="font-medium">{norm.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('common.name')}</p>
              <p className="font-medium">{norm.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('organization.title')}</p>
              <p className="font-medium">{norm.organizationName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('norm.category')}</p>
              <p className="font-medium">{norm.employeeCategory || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('persons.gender')}</p>
              <p className="font-medium">
                {norm.gender === 'MALE' && t('persons.male')}
                {norm.gender === 'FEMALE' && t('persons.female')}
                {!norm.gender && '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('norm.season')}</p>
              <p className="font-medium">
                {norm.season === 'ALL' && t('norm.allSeasons')}
                {norm.season === 'SUMMER' && t('norm.summer')}
                {norm.season === 'WINTER' && t('norm.winter')}
                {norm.season === 'DEMISEASON' && t('norm.demiseason')}
                {!norm.season && '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('norm.priority')}</p>
              <p className="font-medium">{norm.priority ?? '-'}</p>
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
          <div>
            <p className="text-sm text-gray-500">{t('common.description')}</p>
            <p className="font-medium">{norm.description || '-'}</p>
          </div>
        </GovCardContent>
      </GovCard>

      {norm.lines && norm.lines.length > 0 && (
        <GovCard>
          <GovCardHeader>
            <GovCardTitle>{t('norm.items')}</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <div className="space-y-4">
              {norm.lines.map((line: any, index: number) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{t('norm.item')}</p>
                      <p className="font-medium">{line.itemId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('norm.minQty')} / {t('norm.maxQty')}</p>
                      <p className="font-medium">{line.minQty} / {line.maxQty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('norm.serviceLife')} / {t('norm.wearLife')}</p>
                      <p className="font-medium">
                        {line.serviceLifeMonths ? `${line.serviceLifeMonths} мес.` : '-'} / {line.wearLifeMonths ? `${line.wearLifeMonths} мес.` : '-'}
                      </p>
                    </div>
                    {line.clearanceLevel && (
                      <div>
                        <p className="text-sm text-gray-500">{t('norm.clearanceLevel')}</p>
                        <p className="font-medium">{line.clearanceLevel}</p>
                      </div>
                    )}
                    {line.lineComment && (
                      <div className="md:col-span-3">
                        <p className="text-sm text-gray-500">{t('common.comment')}</p>
                        <p className="font-medium">{line.lineComment}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GovCardContent>
        </GovCard>
      )}
    </div>
  )
}
