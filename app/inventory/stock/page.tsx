'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'
import { StockBalancesTable } from '@/widgets/tables/StockBalancesTable'

export default function StockPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.inventory'), href: '/inventory' },
        { label: t('sidebar.stock') }
      ]} />

      <h1 className="text-3xl font-bold">{t('stock.title')}</h1>

      <StockBalancesTable />
    </div>
  )
}
