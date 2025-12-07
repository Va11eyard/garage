'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { ItemSupplyNormsTable } from '@/widgets/tables/ItemSupplyNormsTable'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function ItemSupplyNormsPage() {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('itemSupplyNorm.title') }
            ]} />

            <ItemSupplyNormsTable />
        </div>
    )
}
