'use client'

import { EquipmentTable } from '@/widgets/tables/EquipmentTable'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function EquipmentPage() {
    const { t } = useTranslation()
    
    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('equipment.title') }
            ]} />
            <EquipmentTable />
        </div>
    )
}
