'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useInventorySurplus } from '@/features/manage-inventory-surpluses/model/useInventorySurplus'
import { usePostInventorySurplus } from '@/features/manage-inventory-surpluses/model/usePostInventorySurplus'
import { useCancelInventorySurplus } from '@/features/manage-inventory-surpluses/model/useCancelInventorySurplus'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function SurplusDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: surplus, isLoading } = useInventorySurplus(id)
  const postMutation = usePostInventorySurplus()
  const cancelMutation = useCancelInventorySurplus()
  const confirmDialog = useConfirmDialog()

  const handlePost = () => {
    confirmDialog.showConfirm(
      t('documents.confirmPost'),
      t('documents.confirmPostMessage'),
      async () => {
        try {
          await postMutation.mutateAsync(id)
          toast.success(t('common.success'))
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      }
    )
  }

  const handleCancel = () => {
    confirmDialog.showConfirm(
      t('documents.confirmCancel'),
      t('documents.confirmCancelMessage'),
      async () => {
        try {
          await cancelMutation.mutateAsync(id)
          toast.success(t('common.success'))
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      }
    )
  }

  if (isLoading) return <Spinner />
  if (!surplus) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('breadcrumbs.inventory'), href: '/inventory' },
        { label: t('inventorySurpluses.title'), href: '/inventory/surplus' },
        { label: surplus.docNumber || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{surplus.docNumber}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/inventory/surplus')}>
            {t('common.back')}
          </GovButton>
          {surplus.status === 'DRAFT' && (
            <>
              <GovButton onClick={handlePost}>
                {t('documents.post')}
              </GovButton>
            </>
          )}
          {surplus.status === 'POSTED' && (
            <GovButton variant="danger" onClick={handleCancel}>
              {t('documents.cancel')}
            </GovButton>
          )}
        </div>
      </div>

      <GovCard>
        <GovCardHeader>
          <GovCardTitle>{t('common.details')}</GovCardTitle>
        </GovCardHeader>
        <GovCardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t('documents.documentNumber')}</p>
              <p className="font-medium">{surplus.docNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.documentDate')}</p>
              <p className="font-medium">{surplus.docDate ? new Date(surplus.docDate).toLocaleDateString() : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('organization.title')}</p>
              <p className="font-medium">{surplus.organizationName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.warehouse')}</p>
              <p className="font-medium">{surplus.warehouseName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.status')}</p>
              <p className="font-medium">
                <span className={
                  surplus.status === 'DRAFT' ? 'text-gray-600' :
                  surplus.status === 'POSTED' ? 'text-green-600' :
                  surplus.status === 'CANCELLED' ? 'text-red-600' :
                  'text-gray-600'
                }>
                  {surplus.status ? t(`documents.${surplus.status}`) : t('documents.DRAFT')}
                </span>
              </p>
            </div>
          </div>
          {surplus.comment && (
            <div>
              <p className="text-sm text-gray-500">{t('common.comment')}</p>
              <p className="font-medium">{surplus.comment}</p>
            </div>
          )}
        </GovCardContent>
      </GovCard>

      {surplus.lines && surplus.lines.length > 0 && (
        <GovCard>
          <GovCardHeader>
            <GovCardTitle>Строки документа</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <div className="space-y-4">
              {surplus.lines.map((line: any, index: number) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Номенклатура</p>
                      <p className="font-medium">{line.itemName || line.itemId || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Количество</p>
                      <p className="font-medium">{line.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GovCardContent>
        </GovCard>
      )}

      <GovConfirmModal
        isOpen={confirmDialog.isOpen}
        onClose={confirmDialog.hideConfirm}
        onConfirm={confirmDialog.handleConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={t('common.confirm')}
        cancelText={t('common.cancel')}
        isLoading={postMutation.isPending || cancelMutation.isPending}
      />
    </div>
  )
}
