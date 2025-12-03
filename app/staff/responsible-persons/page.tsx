'use client'

import { ResponsiblePersonsTable } from '@/widgets/tables/ResponsiblePersonsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function ResponsiblePersonsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('breadcrumbs.responsiblePersons') }
            ]} />
            <ResponsiblePersonsTable />
        </div>
    )
}
