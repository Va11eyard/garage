'use client'

import { EmployeeCategoriesTable } from '@/widgets/tables/EmployeeCategoriesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function EmployeeCategoriesPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('employeeCategories.title') }
            ]} />
            <EmployeeCategoriesTable />
        </div>
    )
}
