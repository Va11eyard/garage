'use client'

import { UsersTable } from '@/widgets/tables/UsersTable'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function UsersPage() {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('users.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('users.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('users.createUser')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('users.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <UsersTable />
                </CardContent>
            </Card>
        </div>
    )
}
