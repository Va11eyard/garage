'use client'

import { EmployeeAssignmentsTable } from '@/widgets/tables/EmployeeAssignmentsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function EmployeeAssignmentsPage() {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('assignments.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">
                    {t('assignments.title')}
                </h1>
                <p className="text-gov-gray-600">
                    {t('assignments.description')}
                </p>
            </div>
            
            <EmployeeAssignmentsTable />
        </div>
    )
}
