'use client'

import { ProvisionAnalysisTable } from '@/widgets/tables/ProvisionAnalysisTable'
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
            
            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">
                    {t('reports.staffReports')}
                </h1>
                <p className="text-gov-gray-600">
                    {t('employeeProvision.provisionAnalysis')}
                </p>
            </div>
            
            <ProvisionAnalysisTable />
        </div>
    )
}
