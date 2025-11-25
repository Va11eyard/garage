'use client'

import { TemporaryIssuesTable } from '@/widgets/tables/TemporaryIssuesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function TemporaryIssuePage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('temporaryIssues.title') }
            ]} />
            <TemporaryIssuesTable />
        </div>
    )
}
