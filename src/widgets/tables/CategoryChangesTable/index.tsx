'use client'

import { useCategoryChanges } from '@/features/manage-category-changes/model/useCategoryChanges'
import { usePostCategoryChange } from '@/features/manage-category-changes/model/usePostCategoryChange'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import { toast } from 'sonner'
import Link from 'next/link'
import { format } from 'date-fns'
import { Route } from 'next'

export function CategoryChangesTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        warehouseId: '',
        status: '',
    })
    const { data, isLoading } = useCategoryChanges({ ...debouncedFilters, page, size })
    const postMutation = usePostCategoryChange()

    const handlePost = (id: string) => {
        if (confirm(t('categoryChanges.postDocument'))) {
            postMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('categoryChanges.warehouse')}</label>
                        <Input
                            placeholder={t('categoryChanges.warehouse')}
                            value={filters.warehouseId}
                            onChange={(e) => updateFilter('warehouseId', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('categoryChanges.status')}</label>
                        <Input
                            placeholder={t('categoryChanges.status')}
                            value={filters.status}
                            onChange={(e) => updateFilter('status', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button variant="default" asChild className="shrink-0 text-black">
                    <Link href="/admin/category-changes/create">{t('categoryChanges.createDocument')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('categoryChanges.documentNumber')}</TableHead>
                        <TableHead>{t('categoryChanges.documentDate')}</TableHead>
                        <TableHead>{t('categoryChanges.warehouse')}</TableHead>
                        <TableHead>{t('categoryChanges.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((doc: any) => (
                        <TableRow key={doc.id}>
                            <TableCell>
                                <Link href={`/admin/category-changes/${doc.id}` as Route} className="underline">
                                    {doc.documentNumber}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {doc.documentDate ? format(new Date(doc.documentDate), 'dd.MM.yyyy') : '—'}
                            </TableCell>
                            <TableCell>{doc.warehouseName || '—'}</TableCell>
                            <TableCell>
                                <Badge variant={doc.status === 'POSTED' ? 'default' : 'secondary'}>
                                    {doc.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {doc.status === 'DRAFT' && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handlePost(doc.id!)}
                                    >
                                        {t('categoryChanges.postDocument')}
                                    </Button>
                                )}
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
                <Button onClick={nextPage} disabled={data?.last || page >= (data?.totalPages ?? 1) - 1}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
