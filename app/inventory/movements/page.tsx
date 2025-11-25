'use client'

import { MovementsTable } from '@/widgets/tables/MovementsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function MovementsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('movements.title') }
            ]} />
            <MovementsTable />
        </div>
    )
}
