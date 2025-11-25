'use client'

import { WarehousesTable } from '@/widgets/tables/WarehousesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function WarehousesPage() {
  const { t } = useTranslation()
  
  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.directoriesSection'), href: '/directories' },
        { label: t('warehouses.title') }
      ]} />
      <WarehousesTable />
    </div>
  )
}