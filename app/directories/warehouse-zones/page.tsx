'use client'

import { WarehouseZonesTable } from '@/widgets/tables/WarehouseZonesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function WarehouseZonesPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('warehouseZones.title') }
            ]} />
            <WarehouseZonesTable />
        </div>
    )
}
