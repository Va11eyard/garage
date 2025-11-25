'use client'

import { EmployeesTable } from '@/widgets/tables/EmployeesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function EmployeesPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('breadcrumbs.employees') }
            ]} />
            <EmployeesTable />
        </div>
    )
}
