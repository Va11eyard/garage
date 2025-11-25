'use client'

import { CategoryChangesTable } from '@/widgets/tables/CategoryChangesTable'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function CategoryChangesPage() {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('categoryChanges.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('categoryChanges.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('categoryChanges.createDocument')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('categoryChanges.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CategoryChangesTable />
                </CardContent>
            </Card>
        </div>
    )
}
