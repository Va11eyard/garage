'use client'

import { IntegrationEndpointsTable } from '@/widgets/tables/IntegrationEndpointsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function IntegrationEndpointsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('integrationEndpoints.title') }
            ]} />
            <IntegrationEndpointsTable />
        </div>
    )
}
