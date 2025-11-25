'use client'

import { AuditLogsTable } from '@/widgets/tables/AuditLogsTable'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function AuditLogsPage() {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('auditLog.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('auditLog.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('admin.auditLog')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('auditLog.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <AuditLogsTable />
                </CardContent>
            </Card>
        </div>
    )
}
