'use client'

import { StockBalancesTable } from '@/widgets/tables/StockBalancesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function StockBalancesPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('stockBalances.title') }
            ]} />
            <StockBalancesTable />
        </div>
    )
}
