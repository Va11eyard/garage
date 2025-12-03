'use client'

import { ItemsTable } from '@/widgets/tables/ItemsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function ItemsPage() {
    const { t } = useTranslation()

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('items.title') }
            ]} />
            <ItemsTable />
        </div>
    )
}
