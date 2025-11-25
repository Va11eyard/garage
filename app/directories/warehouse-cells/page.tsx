'use client'

import { WarehouseCellsTable } from '@/widgets/tables/WarehouseCellsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function WarehouseCellsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('warehouseCells.title') }
            ]} />
            <WarehouseCellsTable />
        </div>
    )
}
