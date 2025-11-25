'use client'

import { UnitsTable } from '@/widgets/tables/UnitsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function UnitsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('unitOfMeasure.title') }
            ]} />
            <UnitsTable />
        </div>
    )
}
