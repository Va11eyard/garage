'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Spinner } from '@/shared/ui/spinner'
import Link from 'next/link'
import { format } from 'date-fns'
import { Route } from 'next'

export function EmployeeAssignmentsTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        organizationId: '',
    })
    const { data: organizations } = useOrganizations({})
    
    const { data, isLoading } = useQuery({
        queryKey: ['employee-assignments-page', debouncedFilters, page, size],
        queryFn: () => Service.searchEmployeeItemAssignmentsPage(
            debouncedFilters.organizationId,
            undefined,
            undefined,
            undefined,
            page,
            size
        ),
        enabled: !!debouncedFilters.organizationId,
    })

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="min-w-[250px]">
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
            
            {!filters.organizationId && (
                <div className="text-center py-12 text-gray-500">
                    <p>{t('organizations.selectFirst')}</p>
                </div>
            )}

            {filters.organizationId && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('employees.employee')}</TableHead>
                            <TableHead>{t('items.item')}</TableHead>
                            <TableHead>{t('reports.quantity')}</TableHead>
                            <TableHead>{t('reports.issueDate')}</TableHead>
                            <TableHead>{t('reports.wearEndDate')}</TableHead>
                            <TableHead>{t('common.status')}</TableHead>
                            <TableHead>{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.content && data.content.length > 0 ? (
                            data.content.map((assignment: any) => (
                                <TableRow key={assignment.id}>
                                    <TableCell>
                                        <Link href={`/staff/employees/${assignment.employeeId}` as Route} className="underline hover:text-blue-600">
                                            {assignment.employeeId}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{assignment.itemId}</TableCell>
                                    <TableCell>{assignment.quantity}</TableCell>
                                    <TableCell>
                                        {assignment.issueDate ? format(new Date(assignment.issueDate), 'dd.MM.yyyy') : '—'}
                                    </TableCell>
                                    <TableCell>
                                        {assignment.wearEndDate ? format(new Date(assignment.wearEndDate), 'dd.MM.yyyy') : '—'}
                                    </TableCell>
                                    <TableCell>
                                        <span className={assignment.active ? 'text-green-600' : 'text-gray-600'}>
                                            {assignment.active ? t('common.active') : t('common.inactive')}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/staff/assignments/${assignment.id}` as Route}>{t('common.view')}</Link>
                                        </Button>
                                    </TableCell>
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
            )}

            {filters.organizationId && data && (
                <div className="flex justify-between items-center">
                    <Button onClick={previousPage} disabled={page === 0}>
                        {t('common.previous')}
                    </Button>
                    <span className="text-sm text-gray-600">
                        {t('common.page')} {page + 1} {t('pagination.of')} {data.totalPages ?? 1}
                    </span>
                    <Button onClick={nextPage} disabled={data.last || page >= (data.totalPages ?? 1) - 1}>
                        {t('common.next')}
                    </Button>
                </div>
            )}
        </div>
    )
}
