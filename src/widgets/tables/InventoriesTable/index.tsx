'use client'

import { useDeleteInventory } from '@/features/manage-inventories/model/useDeleteInventory'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'

export function InventoriesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const deleteMutation = useDeleteInventory()

    const handleDelete = (id: string) => {
        if (confirm('Удалить документ инвентаризации?')) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button asChild className="shrink-0 text-black">
                    <Link href="/inventory/inventory-check/create">{t('documents.createDocument')}</Link>
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
                    <TableRow>
                        <TableCell colSpan={isMobile ? 3 : 4} className="text-center py-8 text-muted-foreground">
                            Документы инвентаризации будут отображаться здесь
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={page === 0}>
                    {t('pagination.prev')}
                </Button>
                <span className="text-sm text-gov-text-secondary">
                    {t('pagination.page')} {page + 1} {t('pagination.of')} 1
                </span>
                <Button onClick={nextPage} disabled={true}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
