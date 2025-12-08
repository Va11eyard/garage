'use client'

import { IntegrationEndpointsTable } from '@/widgets/tables/IntegrationEndpointsTable'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function IntegrationEndpointsPage() {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('integrationEndpoints.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('integrationEndpoints.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('integrationEndpoints.description')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('integrationEndpoints.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <IntegrationEndpointsTable />
                </CardContent>
            </Card>
        </div>
    )
}
