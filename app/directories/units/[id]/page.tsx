'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useUnit } from '@/features/manage-units/model/useUnit'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function UnitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: unit, isLoading } = useUnit(id)

  if (isLoading) return <Spinner />
  if (!unit) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('unitOfMeasure.title'), href: '/directories/units' },
        { label: unit.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{unit.name}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/units')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/units/${id}/edit`)}>
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
              <p className="text-sm text-gray-500">{t('unitOfMeasure.code')}</p>
              <p className="font-medium">{unit.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('unitOfMeasure.name')}</p>
              <p className="font-medium">{unit.name}</p>
            </div>
            {unit.shortName && (
              <div>
                <p className="text-sm text-gray-500">{t('unitOfMeasure.shortName')}</p>
                <p className="font-medium">{unit.shortName}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={unit.active ? 'text-green-600' : 'text-red-600'}>
                  {unit.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
        </GovCardContent>
      </GovCard>
    </div>
  )
}
