'use client'

import { useWearReport } from '@/features/manage-reports/model/useWearReport'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'

export function WearReportTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        employeeName: '',
        organizationId: '',
    })
    const { data: organizations } = useOrganizations({})
    const { data, isLoading } = useWearReport({ ...debouncedFilters, page, size })

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('reports.organization')}</label>
                    <select
                        className="border rounded px-3 py-2 w-full min-w-[200px]"
                        value={filters.organizationId}
                        onChange={(e) => updateFilter('organizationId', e.target.value)}
                    >
                        <option value="">{t('organizations.selectOrganization')}</option>
                        {organizations?.content?.map((org: any) => (
                            <option key={org.id} value={org.id}>
                                {org.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('reports.employeeName')}</label>
                    <Input
                        placeholder={t('reports.employeeName')}
                        value={filters.employeeName}
                        onChange={(e) => updateFilter('employeeName', e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('reports.employee')}</TableHead>
                        <TableHead>{t('reports.organization')}</TableHead>
                        <TableHead>{t('reports.item')}</TableHead>
                        <TableHead>{t('reports.issuedQuantity')}</TableHead>
                        <TableHead>{t('reports.wornQuantity')}</TableHead>
                        <TableHead>{t('reports.remainingQuantity')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((row: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{row.employeeName}</TableCell>
                            <TableCell>{row.organizationName}</TableCell>
                            <TableCell>{row.itemName}</TableCell>
                            <TableCell>{row.issuedQuantity}</TableCell>
                            <TableCell>{row.wornQuantity}</TableCell>
                            <TableCell>{row.remainingQuantity}</TableCell>
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
