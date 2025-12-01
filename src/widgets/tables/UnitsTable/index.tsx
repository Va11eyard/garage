'use client'

import { useUnits } from '@/features/manage-units/model/useUnits'
import { useDeleteUnit } from '@/features/manage-units/model/useDeleteUnit'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'

export function UnitsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ code: '', name: '' })
    const { data, isLoading } = useUnits()
    const deleteMutation = useDeleteUnit()

    const handleDelete = (id: string) => {
        if (confirm(t('unitOfMeasure.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('unitOfMeasure.code')}</label>
                        <Input
                            placeholder={t('unitOfMeasure.code')}
                            value={filters.code}
                            onChange={(e) => updateFilter('code', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('unitOfMeasure.name')}</label>
                        <Input
                            placeholder={t('unitOfMeasure.name')}
                            value={filters.name}
                            onChange={(e) => updateFilter('name', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/directories/units/create">{t('unitOfMeasure.createUnit')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('unitOfMeasure.code')}</TableHead>
                        <TableHead>{t('unitOfMeasure.name')}</TableHead>
                        {!isMobile && <TableHead>{t('unitOfMeasure.shortName')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((unit: any) => (
                        <TableRow key={unit.id}>
                            <TableCell>{unit.code}</TableCell>
                            <TableCell>{unit.name}</TableCell>
                            {!isMobile && <TableCell>{unit.shortName || '-'}</TableCell>}
                            <TableCell>
                                <Link href={`/directories/units/${unit.id}/edit`}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.edit')}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(unit.id!)}
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
                <Button onClick={nextPage} disabled={data?.last || page >= (data?.totalPages ?? 1) - 1}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
