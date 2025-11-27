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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

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
                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mb-1">{t('reports.organization')}</label>
                    <Select
                        value={filters.organizationId || '__ALL__'}
                        onValueChange={(value) => updateFilter('organizationId', value === '__ALL__' ? '' : value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('organizations.selectOrganization')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                            {organizations?.content?.map((org: any) => (
                                <SelectItem key={org.id} value={org.id}>
                                    {org.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
