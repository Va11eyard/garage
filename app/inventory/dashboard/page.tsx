'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { useDashboard } from '@/features/view-dashboard/model/useDashboard'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'

export default function InventoryDashboardPage() {
  const { t } = useTranslation()
  const { data, isLoading } = useDashboard()

  if (isLoading) return <Spinner />

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.inventory'), href: '/inventory' },
        { label: t('sidebar.dashboard') }
      ]} />

      <h1 className="text-3xl font-bold">{t('dashboard.inventory')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GovCard>
          <GovCardHeader>
            <GovCardTitle>{t('dashboard.totalItems')}</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <p className="text-3xl font-bold">{data?.totalItems || 0}</p>
          </GovCardContent>
        </GovCard>

        <GovCard>
          <GovCardHeader>
            <GovCardTitle>{t('dashboard.lowStock')}</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <p className="text-3xl font-bold text-red-600">{data?.lowStockItems || 0}</p>
          </GovCardContent>
        </GovCard>

        <GovCard>
          <GovCardHeader>
            <GovCardTitle>{t('dashboard.pendingReceipts')}</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <p className="text-3xl font-bold">{data?.pendingReceipts || 0}</p>
          </GovCardContent>
        </GovCard>

        <GovCard>
          <GovCardHeader>
            <GovCardTitle>{t('dashboard.pendingIssues')}</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <p className="text-3xl font-bold">{data?.pendingIssues || 0}</p>
          </GovCardContent>
        </GovCard>
      </div>
    </div>
  )
}
