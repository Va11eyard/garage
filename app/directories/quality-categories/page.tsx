'use client'

import { QualityCategoriesTable } from '@/widgets/tables/QualityCategoriesTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function QualityCategoriesPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('qualityCategory.title') }
            ]} />
            <QualityCategoriesTable />
        </div>
    )
}
