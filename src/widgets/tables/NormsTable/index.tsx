'use client'

import { useNormsSearch } from '@/features/manage-norms/model/useNormsSearch'
import { useDeleteNorm } from '@/features/manage-norms/model/useDeleteNorm'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'

export function NormsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ 
        search: '' 
    })
    const { data, isLoading } = useNormsSearch({ 
        search: debouncedFilters.search || undefined, 
        page, 
        size 
    })
    const deleteMutation = useDeleteNorm()

    const handleDelete = (id: string) => {
        if (confirm(t('norm.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4 mb-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('common.search')}</label>
                        <Input
                            placeholder={t('common.search')}
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/directories/norms/create">{t('norm.createNorm')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('norm.item')}</TableHead>
                        <TableHead>{t('norm.category')}</TableHead>
                        {!isMobile && <TableHead>{t('norm.quantity')}</TableHead>}
                        {!isMobile && <TableHead>{t('norm.wearPeriod')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((norm: any) => (
                        <TableRow key={norm.id}>
                            <TableCell>{norm.item?.name || '-'}</TableCell>
                            <TableCell>{norm.employeeCategory?.name || '-'}</TableCell>
                            {!isMobile && <TableCell>{norm.quantity || '-'}</TableCell>}
                            {!isMobile && <TableCell>{norm.wearPeriodMonths ? `${norm.wearPeriodMonths} мес.` : '-'}</TableCell>}
                            <TableCell>
                                <Link href={`/directories/norms/${norm.id}` as Route}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.view')}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(norm.id!)}
                                >
                                    {t('common.delete')}
                                </Button>
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
