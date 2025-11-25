'use client'

import { RolesTable } from '@/widgets/tables/RolesTable'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function RolesPage() {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('roles.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('roles.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('roles.createRole')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('roles.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <RolesTable />
                </CardContent>
            </Card>
        </div>
    )
}
