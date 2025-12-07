'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useReturn } from '@/features/manage-returns/model/useReturn'
import { usePostReturn } from '@/features/manage-returns/model/usePostReturn'
import { useCancelReturn } from '@/features/manage-returns/model/useCancelReturn'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function ReturnDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()
  const router = useRouter()
  const { data: returnDoc, isLoading, refetch } = useReturn(id)
  const postMutation = usePostReturn()
  const cancelMutation = useCancelReturn()
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
  if (!returnDoc) return <div>{t('common.notFound')}</div>

  return (
    <div className="space-y-6">
      <GovBreadcrumb items={[
        { label: t('breadcrumbs.inventory'), href: '/inventory' },
        { label: t('returns.title'), href: '/inventory/return' },
        { label: returnDoc.docNumber || id }
      ]} />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('returns.title')} {returnDoc.docNumber}</h1>
        <div className="flex gap-2">
          <GovButton variant="outline" onClick={() => router.push('/inventory/return')}>
            {t('common.back')}
          </GovButton>
          {returnDoc.status === 'DRAFT' && (
            <>
              <GovButton onClick={() => router.push(`/inventory/return/${id}/edit`)}>
                {t('common.edit')}
              </GovButton>
              <GovButton onClick={handlePost}>
                {t('documents.post')}
              </GovButton>
            </>
          )}
          {returnDoc.status === 'POSTED' && (
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
              <p className="font-medium">{returnDoc.docNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.documentDate')}</p>
              <p className="font-medium">{returnDoc.docDate ? new Date(returnDoc.docDate).toLocaleDateString() : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.status')}</p>
              <p className="font-medium">
                <span className={returnDoc.status === 'DRAFT' ? 'text-gray-600' : returnDoc.status === 'POSTED' ? 'text-green-600' : 'text-red-600'}>
                  {t(`documents.${returnDoc.status}`)}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('organization.title')}</p>
              <p className="font-medium">{returnDoc.organizationName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('documents.warehouse')}</p>
              <p className="font-medium">{returnDoc.warehouseName || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Сотрудник</p>
              <p className="font-medium">{returnDoc.employeeFullName || '-'}</p>
            </div>
            {returnDoc.reason && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Причина возврата</p>
                <p className="font-medium">{returnDoc.reason}</p>
              </div>
            )}
          </div>
        </GovCardContent>
      </GovCard>

      {returnDoc.lines && returnDoc.lines.length > 0 && (
        <GovCard>
          <GovCardHeader>
            <GovCardTitle>Строки документа</GovCardTitle>
          </GovCardHeader>
          <GovCardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№</TableHead>
                  <TableHead>Номенклатура</TableHead>
                  <TableHead>Количество</TableHead>
                  <TableHead>Комментарий</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returnDoc.lines.map((line: any, index: number) => (
                  <TableRow key={line.id || index}>
                    <TableCell>{line.lineNo || index + 1}</TableCell>
                    <TableCell>{line.itemName || '-'}</TableCell>
                    <TableCell>{line.quantity || 0}</TableCell>
                    <TableCell>{line.comment || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
