'use client'

import { SystemJobsTable } from '@/widgets/tables/SystemJobsTable'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function SystemJobsPage() {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('systemJobs.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('systemJobs.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('systemJobs.description')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('systemJobs.scheduledJobs')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <SystemJobsTable />
                </CardContent>
            </Card>
        </div>
    )
}
