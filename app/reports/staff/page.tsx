'use client'

import { WearReportTable } from '@/widgets/tables/WearReportTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function StaffReportsPage() {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.reports'), href: '/reports' },
                { label: t('breadcrumbs.staffReports') }
            ]} />
            <WearReportTable />
        </div>
    )
}
