'use client'

import { OrganizationsTable } from '@/widgets/tables/OrganizationsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function OrganizationsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('organizations.title') }
            ]} />
            <OrganizationsTable />
        </div>
    )
}
