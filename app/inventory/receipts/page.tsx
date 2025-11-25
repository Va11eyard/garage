'use client'

import { ReceiptsTable } from '@/widgets/tables/ReceiptsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function ReceiptsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('receipts.title') }
            ]} />
            <ReceiptsTable />
        </div>
    )
}
