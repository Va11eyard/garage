'use client'

import { SystemSettingsTable } from '@/widgets/tables/SystemSettingsTable'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function SystemSettingsPage() {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('systemSettings.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('systemSettings.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('systemSettings.updateSetting')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('systemSettings.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <SystemSettingsTable />
                </CardContent>
            </Card>
        </div>
    )
}
