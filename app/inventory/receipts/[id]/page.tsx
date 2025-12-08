'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useReceipt } from '@/features/manage-receipts/model/useReceipt'
import { usePostReceipt } from '@/features/manage-receipts/model/usePostReceipts'
import { useUnpostReceipt } from '@/features/manage-receipts/model/useUnpostReceipts'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function ReceiptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: receipt, isLoading } = useReceipt(id)
  const postMutation = usePostReceipt()
  const unpostMutation = useUnpostReceipt()
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

  const handleUnpost = () => {
    confirmDialog.showConfirm(
      t('documents.confirmUnpost'),
      t('documents.confirmUnpostMessage'),
      async () => {
        try {
          await unpostMutation.mutateAsync(id)
          toast.success(t('common.success'))
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      }
    )
  }

  if (isLoading) return <Spinner />
  if (!receipt) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('breadcrumbs.inventory'), href: '/inventory' },
        { label: t('receipts.title'), href: '/inventory/receipts' },
        { label: receipt.docNumber || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{receipt.docNumber}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/inventory/receipts')}>
            {t('common.back')}
          </GovButton>
          {receipt.status === 'DRAFT' && (
            <>
              <GovButton onClick={() => router.push(`/inventory/receipts/${id}/edit`)}>
                {t('common.edit')}
              </GovButton>
              <GovButton onClick={handlePost} disabled={postMutation.isPending}>
                {t('documents.post')}
              </GovButton>
            </>
          )}
          {receipt.status === 'POSTED' && (
            <GovButton variant="danger" onClick={handleUnpost} disabled={unpostMutation.isPending}>
              {t('documents.unpost')}
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
              <p className="font-medium">{receipt.docNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.documentDate')}</p>
              <p className="font-medium">{receipt.docDate ? new Date(receipt.docDate).toLocaleDateString() : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('organization.title')}</p>
              <p className="font-medium">{receipt.organizationName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.warehouse')}</p>
              <p className="font-medium">{receipt.warehouseName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.statusLabel')}</p>
              <p className="font-medium">
                <span className={
                  receipt.status === 'DRAFT' ? 'text-gray-600' :
                  receipt.status === 'POSTED' ? 'text-green-600' :
                  receipt.status === 'CANCELLED' ? 'text-red-600' :
                  'text-gray-600'
                }>
                  {receipt.status ? t(`documents.${receipt.status}`) : t('documents.DRAFT')}
                </span>
              </p>
            </div>
            {receipt.supplierName && (
              <div>
                <p className="text-sm text-gray-500">Поставщик</p>
                <p className="font-medium">{receipt.supplierName}</p>
              </div>
            )}
          </div>
          {receipt.comment && (
            <div>
              <p className="text-sm text-gray-500">{t('common.comment')}</p>
              <p className="font-medium">{receipt.comment}</p>
            </div>
          )}
        </GovCardContent>
      </GovCard>

      {receipt.lines && receipt.lines.length > 0 && (
        <GovCard>
          <GovCardHeader>
            <GovCardTitle>Строки документа</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <div className="space-y-4">
              {receipt.lines.map((line: any, index: number) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Номенклатура</p>
                      <p className="font-medium">{line.itemName || line.itemId || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Единица измерения</p>
                      <p className="font-medium">{line.unitCode || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Количество</p>
                      <p className="font-medium">{line.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Цена</p>
                      <p className="font-medium">{line.price ? `${line.price} ₸` : '-'}</p>
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
        isLoading={postMutation.isPending || unpostMutation.isPending}
      />
    </div>
  )
}
