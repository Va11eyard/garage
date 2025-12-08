'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useTemporaryIssue } from '@/features/manage-temporary-issues/model/useTemporaryIssue'
import { usePostTemporaryIssue } from '@/features/manage-temporary-issues/model/usePostTemporaryIssue'
import { useCancelTemporaryIssue } from '@/features/manage-temporary-issues/model/useCancelTemporaryIssue'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function TemporaryUseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: tempIssue, isLoading } = useTemporaryIssue(id)
  const postMutation = usePostTemporaryIssue()
  const cancelMutation = useCancelTemporaryIssue()
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
  if (!tempIssue) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('breadcrumbs.inventory'), href: '/inventory' },
        { label: t('temporaryIssues.title'), href: '/inventory/temporary-use' },
        { label: tempIssue.docNumber || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{tempIssue.docNumber}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/inventory/temporary-use')}>
            {t('common.back')}
          </GovButton>
          {tempIssue.status === 'DRAFT' && (
            <>
              <GovButton onClick={() => router.push(`/inventory/temporary-use/${id}/edit`)}>
                {t('common.edit')}
              </GovButton>
              <GovButton onClick={handlePost}>
                {t('documents.post')}
              </GovButton>
            </>
          )}
          {tempIssue.status === 'POSTED' && (
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
              <p className="font-medium">{tempIssue.docNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.documentDate')}</p>
              <p className="font-medium">{tempIssue.docDate ? new Date(tempIssue.docDate).toLocaleDateString() : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('organization.title')}</p>
              <p className="font-medium">{tempIssue.organizationName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.warehouse')}</p>
              <p className="font-medium">{tempIssue.warehouseName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.statusLabel')}</p>
              <p className="font-medium">
                <span className={
                  tempIssue.status === 'DRAFT' ? 'text-gray-600' :
                  tempIssue.status === 'POSTED' ? 'text-green-600' :
                  tempIssue.status === 'CANCELLED' ? 'text-red-600' :
                  'text-gray-600'
                }>
                  {tempIssue.status ? t(`documents.${tempIssue.status}`) : t('documents.DRAFT')}
                </span>
              </p>
            </div>
            {tempIssue.employeeFullName && (
              <div>
                <p className="text-sm text-gray-500">Сотрудник</p>
                <p className="font-medium">{tempIssue.employeeFullName}</p>
              </div>
            )}
            {tempIssue.plannedReturnDate && (
              <div>
                <p className="text-sm text-gray-500">Плановая дата возврата</p>
                <p className="font-medium">{new Date(tempIssue.plannedReturnDate).toLocaleDateString()}</p>
              </div>
            )}
            {tempIssue.reason && (
              <div>
                <p className="text-sm text-gray-500">{t('documents.reason')}</p>
                <p className="font-medium">{tempIssue.reason}</p>
              </div>
            )}
          </div>
        </GovCardContent>
      </GovCard>

      {tempIssue.lines && tempIssue.lines.length > 0 && (
        <GovCard>
          <GovCardHeader>
            <GovCardTitle>Строки документа</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <div className="space-y-4">
              {tempIssue.lines.map((line: any, index: number) => (
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
