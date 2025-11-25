'use client'

import { IssuesTable } from '@/widgets/tables/IssuesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function IssuePage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('issues.title') }
            ]} />
            <IssuesTable />
        </div>
    )
}
