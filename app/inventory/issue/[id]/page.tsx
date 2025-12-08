'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useIssue } from '@/features/manage-issues/model/useIssue'
import { usePostIssue } from '@/features/manage-issues/model/usePostIssue'
import { useCancelIssue } from '@/features/manage-issues/model/useCancelIssue'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function IssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: issue, isLoading, refetch } = useIssue(id)
  const postMutation = usePostIssue()
  const cancelMutation = useCancelIssue()
  const confirmDialog = useConfirmDialog()

  const handlePost = () => {
    confirmDialog.showConfirm(
      t('documents.confirmPost'),
      t('documents.confirmPostMessage'),
      async () => {
        try {
          await postMutation.mutateAsync(id)
          toast.success(t('common.success'))
          refetch()
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
          refetch()
        } catch (error) {
          toast.error(getErrorMessage(error))
        }
      }
    )
  }

  if (isLoading) return <Spinner />
  if (!issue) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('breadcrumbs.inventory'), href: '/inventory' },
        { label: t('issues.title'), href: '/inventory/issue' },
        { label: issue.docNumber || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{issue.docNumber}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/inventory/issue')}>
            {t('common.back')}
          </GovButton>
          {issue.status === 'DRAFT' && (
            <>
              <GovButton onClick={() => router.push(`/inventory/issue/${id}/edit`)}>
                {t('common.edit')}
              </GovButton>
              <GovButton onClick={handlePost} disabled={postMutation.isPending}>
                {t('documents.post')}
              </GovButton>
            </>
          )}
          {issue.status === 'POSTED' && (
            <GovButton variant="danger" onClick={handleCancel} disabled={cancelMutation.isPending}>
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
              <p className="font-medium">{issue.docNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.documentDate')}</p>
              <p className="font-medium">{issue.docDate ? new Date(issue.docDate).toLocaleDateString() : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('organization.title')}</p>
              <p className="font-medium">{issue.organizationName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.warehouse')}</p>
              <p className="font-medium">{issue.warehouseName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.statusLabel')}</p>
              <p className="font-medium">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  issue.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                  issue.status === 'POSTED' ? 'bg-green-100 text-green-800' :
                  issue.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {issue.status ? t(`documents.${issue.status}`) : t('documents.DRAFT')}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Сотрудник</p>
              <p className="font-medium">{issue.employeeFullName || '-'}</p>
            </div>
            {issue.employeePosition && (
              <div>
                <p className="text-sm text-gray-500">Должность</p>
                <p className="font-medium">{issue.employeePosition}</p>
              </div>
            )}
            {issue.employeeCategory && (
              <div>
                <p className="text-sm text-gray-500">Категория</p>
                <p className="font-medium">{issue.employeeCategory}</p>
              </div>
            )}
          </div>
          {issue.comment && (
            <div>
              <p className="text-sm text-gray-500">{t('common.comment')}</p>
              <p className="font-medium">{issue.comment}</p>
            </div>
          )}
        </GovCardContent>
      </GovCard>

      {issue.lines && issue.lines.length > 0 && (
        <GovCard>
          <GovCardHeader>
            <GovCardTitle>Строки документа</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <div className="space-y-4">
              {issue.lines.map((line: any, index: number) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Номенклатура</p>
                      <p className="font-medium">{line.itemName || line.itemId || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Единица измерения</p>
                      <p className="font-medium">{line.unitName || line.unitId || '-'}</p>
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
        isLoading={postMutation.isPending || cancelMutation.isPending}
      />
    </div>
  )
}
