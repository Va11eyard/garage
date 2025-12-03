'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useRouter } from 'next/navigation'
import { useReplacementOrders } from '@/features/manage-replacement-orders/model/useReplacementOrders'
import { Spinner } from '@/shared/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

export default function ReplacementOrderPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { data, isLoading } = useReplacementOrders({})

  if (isLoading) return <Spinner />

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.inventory'), href: '/inventory' },
        { label: t('replacementOrders.title') }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('replacementOrders.title')}</h1>
        <GovButton onClick={() => router.push('/inventory/replacement-order/create')}>
          {t('common.create')}
        </GovButton>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('common.id')}</TableHead>
            <TableHead>{t('common.date')}</TableHead>
            <TableHead>{t('common.status')}</TableHead>
            <TableHead>{t('common.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.content?.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <GovButton variant="ghost" size="sm" onClick={() => router.push(`/inventory/replacement-order/${order.id}` as any)}>
                  {t('common.view')}
                </GovButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
