'use client'

import { PersonsTable } from '@/widgets/tables/PersonsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function PersonsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('persons.title') }
            ]} />
            <PersonsTable />
        </div>
    )
}
