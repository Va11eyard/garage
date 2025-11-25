'use client'

import { InventoriesTable } from '@/widgets/tables/InventoriesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function InventoryCheckPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('inventoryCheck.title') }
            ]} />
            <InventoriesTable />
        </div>
    )
}
