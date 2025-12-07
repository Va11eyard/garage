'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useWarehouseCell } from '@/features/manage-warehouse-cells/model/useWarehouseCell'
import { useWarehouse } from '@/features/manage-warehouses/model/useWarehouse'
import { useWarehouseZone } from '@/features/manage-warehouse-zones/model/useWarehouseZone'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function WarehouseCellDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: cell, isLoading } = useWarehouseCell(id)
  const { data: warehouse } = useWarehouse(cell?.warehouseId)
  const { data: zone } = useWarehouseZone(cell?.zoneId)

  if (isLoading) return <Spinner />
  if (!cell) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('warehouseCells.title'), href: '/directories/warehouse-cells' },
        { label: cell.code || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{cell.code}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/directories/warehouse-cells')}>
            {t('common.back')}
          </GovButton>
          <GovButton onClick={() => router.push(`/directories/warehouse-cells/${id}/edit`)}>
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
              <p className="text-sm text-gray-500">{t('warehouseCells.code')}</p>
              <p className="font-medium">{cell.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('warehouseCells.warehouse')}</p>
              <p className="font-medium">{warehouse?.name || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('warehouseCells.zone')}</p>
              <p className="font-medium">{zone?.name || '-'}</p>
            </div>
            {cell.capacity && (
              <div>
                <p className="text-sm text-gray-500">{t('warehouseCells.capacity')}</p>
                <p className="font-medium">{cell.capacity}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">{t('common.status')}</p>
              <p className="font-medium">
                <span className={cell.active ? 'text-green-600' : 'text-red-600'}>
                  {cell.active ? t('common.active') : t('common.inactive')}
                </span>
              </p>
            </div>
          </div>
          {cell.description && (
            <div>
              <p className="text-sm text-gray-500">{t('warehouseCells.description')}</p>
              <p className="font-medium">{cell.description}</p>
            </div>
          )}
        </GovCardContent>
      </GovCard>
    </div>
  )
}
