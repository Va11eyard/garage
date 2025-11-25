'use client'

import { InventorySurplusTable } from '@/widgets/tables/InventorySurplusTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function InventorySurplusPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('inventorySurpluses.title') }
            ]} />
            <InventorySurplusTable />
        </div>
    )
}
