'use client'

import { WriteOffsTable } from '@/widgets/tables/WriteOffsTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function WriteOffsPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('writeOffs.title') }
            ]} />
            <WriteOffsTable />
        </div>
    )
}
