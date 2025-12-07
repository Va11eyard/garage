'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useWarehouseZone } from '@/features/manage-warehouse-zones/model/useWarehouseZone'
import { useWarehouse } from '@/features/manage-warehouses/model/useWarehouse'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function WarehouseZoneDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: zone, isLoading } = useWarehouseZone(id)
  const { data: warehouse } = useWarehouse(zone?.warehouseId)

  if (isLoading) return <Spinner />
  if (!zone) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('warehouseZones.title'), href: '/directories/warehouse-zones' },
        { label: zone.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{zone.name}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/warehouse-zones')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/warehouse-zones/${id}/edit` as any)}>
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
              <p className="text-sm text-gray-500">{t('warehouseZones.code')}</p>
              <p className="font-medium">{zone.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('warehouseZones.name')}</p>
              <p className="font-medium">{zone.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('warehouseZones.warehouse')}</p>
              <p className="font-medium">{warehouse?.name || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={zone.active ? 'text-green-600' : 'text-red-600'}>
                  {zone.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
        </GovCardContent>
      </GovCard>
    </div>
  )
}
