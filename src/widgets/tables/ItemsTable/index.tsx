'use client'

import { useItems } from '@/features/manage-items/model/useItems'
import { useDeleteItem } from '@/features/manage-items/model/useDeleteItem'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ItemsTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ code: '', name: '' })
    const { data, isLoading } = useItems({ ...debouncedFilters, page, size })
    const deleteMutation = useDeleteItem()

    const handleDelete = (id: string) => {
        if (confirm(t('items.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: (error: any) => toast.error(getErrorMessage(error)),
            })
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('items.code')}</label>
                        <Input
                            placeholder={t('items.code')}
                            value={filters.code}
                            onChange={e => updateFilter('code', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('items.name')}</label>
                        <Input
                            placeholder={t('items.name')}
                            value={filters.name}
                            onChange={e => updateFilter('name', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Link href="/directories/items/create">
                    <Button variant="default" className="shrink-0">{t('items.createItem')}</Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('items.code')}</TableHead>
                        <TableHead>{t('items.name')}</TableHead>
                        <TableHead>{t('items.itemGroup')}</TableHead>
                        <TableHead>{t('items.unitOfMeasure')}</TableHead>
                        <TableHead>{t('items.barcode')}</TableHead>
                        <TableHead>{t('items.weightKg')}</TableHead>
                        <TableHead>{t('items.volumeM3')}</TableHead>
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Link href={`/directories/items/${item.id}` as Route} className="underline">{item.code}</Link>
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.groupCode || '—'}</TableCell>
                            <TableCell>{item.baseUnitCode || '—'}</TableCell>
                            <TableCell>{item.barcode || '—'}</TableCell>
                            <TableCell>{item.weightKg != null ? item.weightKg : '—'}</TableCell>
                            <TableCell>{item.volumeM3 != null ? item.volumeM3 : '—'}</TableCell>
                            <TableCell>
                                <span className={item.active ? 'text-green-600' : 'text-red-600'}>
                                    {item.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link href={`/directories/items/${item.id}` as Route}>
                                    <Button variant="ghost" size="sm">{t('common.view')}</Button>
                                </Link>
                                <Link href={`/directories/items/${item.id}/edit` as Route}>
                                    <Button variant="ghost" size="sm">{t('common.edit')}</Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(item.id!)}
                                >
                                    {t('common.delete')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={page === 0}>{t('pagination.prev')}</Button>
                <span className="text-sm text-gov-text-secondary">
          {t('pagination.page')} {page + 1} {t('pagination.of')} {data?.totalPages ?? 1}
        </span>
                <Button onClick={nextPage} disabled={data?.last || page >= (data?.totalPages ?? 1) - 1}>{t('pagination.next')}</Button>
            </div>
        </div>
    )
}
