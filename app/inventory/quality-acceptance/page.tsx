'use client'

import { QualityAcceptanceTable } from '@/widgets/tables/QualityAcceptanceTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function QualityAcceptancePage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('qualityAcceptances.title') }
            ]} />
            <QualityAcceptanceTable />
        </div>
    )
}
