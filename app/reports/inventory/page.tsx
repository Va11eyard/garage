'use client'

import { WearReportTable } from '@/widgets/tables/WearReportTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function InventoryReportsPage() {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.reports'), href: '/reports' },
                { label: t('reports.inventory') }
            ]} />

            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">
                    {t('reports.wearReport')}
                </h1>
                <p className="text-gov-gray-600">
                    {t('reports.wearReportDescription')}
                </p>
            </div>

            <WearReportTable />
        </div>
    )
}
