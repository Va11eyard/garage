'use client'

import { OrgUnitsTable } from '@/widgets/tables/OrgUnitsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function OrgUnitsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('orgUnits.title') }
            ]} />
            <OrgUnitsTable />
        </div>
    )
}
