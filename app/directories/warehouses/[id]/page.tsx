'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useWarehouse } from '@/features/manage-warehouses/model/useWarehouse'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function WarehouseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: warehouse, isLoading } = useWarehouse(id)

  if (isLoading) return <Spinner />
  if (!warehouse) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('warehouses.title'), href: '/directories/warehouses' },
        { label: warehouse.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{warehouse.name}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/warehouses')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/warehouses/${id}/edit`)}>
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
              <p className="text-sm text-gray-500">{t('warehouses.code')}</p>
              <p className="font-medium">{warehouse.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('warehouses.name')}</p>
              <p className="font-medium">{warehouse.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('warehouses.organization')}</p>
              <p className="font-medium">{warehouse.organizationName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('warehouses.orgUnit')}</p>
              <p className="font-medium">{warehouse.orgUnitName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={warehouse.active ? 'text-green-600' : 'text-red-600'}>
                  {warehouse.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
          {warehouse.address && (
            <div>
              <p className="text-sm text-gray-500">{t('warehouses.address')}</p>
              <p className="font-medium">{warehouse.address}</p>
            </div>
          )}
          {warehouse.description && (
            <div>
              <p className="text-sm text-gray-500">{t('warehouses.description')}</p>
              <p className="font-medium">{warehouse.description}</p>
            </div>
          )}
        </GovCardContent>
      </GovCard>
    </div>
  )
}
