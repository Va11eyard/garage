'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useCreateReplacementOrder } from '@/features/manage-replacement-orders/model/useCreateReplacementOrder'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'

export default function CreateReplacementOrderPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const createMutation = useCreateReplacementOrder()
  const [formData, setFormData] = useState({
    employeeId: '',
    itemId: '',
    quantity: '',
    reason: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMutation.mutateAsync({
        employeeId: formData.employeeId,
        itemId: formData.itemId,
        quantity: Number(formData.quantity),
        reason: formData.reason,
      } as any)
      toast.success(t('common.success'))
      router.push('/inventory/replacement-order')
    } catch (error) {
      toast.error(t('common.error'))
    }
  }

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('sidebar.inventory'), href: '/inventory' },
        { label: t('replacementOrders.title'), href: '/inventory/replacement-order' },
        { label: t('common.create') }
      ]} />

      <h1 className="text-3xl font-bold">{t('replacementOrders.create')}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <GovLabel required>{t('common.employee')}</GovLabel>
          <GovInput
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            required
          />
        </div>

        <div>
          <GovLabel required>{t('common.item')}</GovLabel>
          <GovInput
            value={formData.itemId}
            onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
            required
          />
        </div>

        <div>
          <GovLabel required>{t('common.quantity')}</GovLabel>
          <GovInput
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
        </div>

        <div>
          <GovLabel>{t('common.reason')}</GovLabel>
          <GovInput
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <GovButton type="submit">{t('common.create')}</GovButton>
          <GovButton type="button" variant="outline" onClick={() => router.back()}>
            {t('common.cancel')}
          </GovButton>
        </div>
      </form>
    </div>
  )
}
