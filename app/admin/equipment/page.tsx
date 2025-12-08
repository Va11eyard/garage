'use client'

import { EquipmentTable } from '@/widgets/tables/EquipmentTable'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'

export default function EquipmentPage() {
    const { t } = useTranslation()

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('equipment.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('equipment.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('equipment.description')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('equipment.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <EquipmentTable />
                </CardContent>
            </Card>
        </div>
    )
}
