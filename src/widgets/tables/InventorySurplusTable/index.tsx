'use client'

import { useInventorySurplusSearch } from '@/features/manage-inventory-surpluses/model/useInventorySurplusSearch'
import { useDeleteInventorySurplus } from '@/features/manage-inventory-surpluses/model/useDeleteInventorySurplus'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'

export function InventorySurplusTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { data, isLoading } = useInventorySurplusSearch({ page, size })
    const deleteMutation = useDeleteInventorySurplus()

    const handleDelete = (id: string) => {
        if (confirm(t('inventorySurpluses.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button asChild className="shrink-0 text-black">
                    <Link href="/inventory/surplus/create">{t('inventorySurpluses.createSurplus')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('documents.documentNumber')}</TableHead>
                        <TableHead>{t('documents.documentDate')}</TableHead>
                        {!isMobile && <TableHead>Статус</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((doc: any) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.documentNumber}</TableCell>
                            <TableCell>{new Date(doc.documentDate).toLocaleDateString()}</TableCell>
                            {!isMobile && (
                                <TableCell>
                                    <span className={`gov-badge gov-badge-${doc.status?.toLowerCase()}`}>
                                        {doc.status}
                                    </span>
                                </TableCell>
                            )}
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/inventory/surplus/${doc.id}` as Route}>
                                            {t('common.view')}
                                        </Link>
                                    </Button>
                                    {doc.status === 'DRAFT' && (
                                        <>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/inventory/surplus/${doc.id}/edit` as Route}>
                                                    {t('common.edit')}
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600"
                                                onClick={() => handleDelete(doc.id!)}
                                            >
                                                {t('common.delete')}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={page === 0}>
                    {t('pagination.prev')}
                </Button>
                <span className="text-sm text-gov-text-secondary">
                    {t('pagination.page')} {page + 1} {t('pagination.of')} {data?.totalPages ?? 1}
                </span>
                <Button onClick={nextPage} disabled={data?.last}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
