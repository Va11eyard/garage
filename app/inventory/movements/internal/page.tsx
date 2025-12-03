'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'
import { MovementsTable } from '@/widgets/tables/MovementsTable'

export default function InternalMovementsPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.inventory'), href: '/inventory' },
        { label: t('movements.title'), href: '/inventory/movements' },
        { label: t('movements.internal') }
      ]} />

      <h1 className="text-3xl font-bold">{t('movements.internal')}</h1>

      <MovementsTable />
    </div>
  )
}
