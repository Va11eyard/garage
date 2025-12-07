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
    const { data, isLoading, error } = useWearReport({ ...debouncedFilters, page, size })

    if (isLoading) return <Spinner />
    
    if (error) {
        return (
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="min-w-[200px]">
                        <label className="block text-sm font-medium mb-1">{t('reports.organization')}</label>
                        <Select
                            value={filters.organizationId || undefined}
                            onValueChange={(value) => updateFilter('organizationId', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('organizations.selectOrganization')} />
                            </SelectTrigger>
                            <SelectContent>
                                {organizations?.content?.map((org: any) => (
                                    <SelectItem key={org.id} value={org.id}>
                                        {org.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="text-center py-12 text-red-500">
                    <p className="font-medium">{t('common.error')}</p>
                    <p className="text-sm mt-2">{(error as any)?.body?.message || (error as any)?.message || t('reports.backendError')}</p>
                    <p className="text-xs mt-2 text-gray-500">{t('reports.contactSupport')}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="min-w-[200px]">
                    <label className="block text-sm font-medium mb-1">{t('reports.organization')}</label>
                    <Select
                        value={filters.organizationId || undefined}
                        onValueChange={(value) => updateFilter('organizationId', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('organizations.selectOrganization')} />
                        </SelectTrigger>
                        <SelectContent>
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
                        <TableHead>{t('reports.issueDate')}</TableHead>
                        <TableHead>{t('reports.wearEndDate')}</TableHead>
                        <TableHead>{t('reports.quantity')}</TableHead>
                        <TableHead>{t('reports.category')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content && data.content.length > 0 ? (
                        data.content.map((row: any, index: number) => (
                            <TableRow key={row.assignmentId || index}>
                                <TableCell>
                                    {row.employeeLastName} {row.employeeFirstName} {row.employeeMiddleName || ''}
                                </TableCell>
                                <TableCell>{row.organizationName}</TableCell>
                                <TableCell>{row.itemName}</TableCell>
                                <TableCell>{row.issueDate}</TableCell>
                                <TableCell>{row.wearEndDate}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.category}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500">
                                {t('common.noData')}
                            </TableCell>
                        </TableRow>
                    )}
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
