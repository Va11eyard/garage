'use client'

import { useEmployeeAssignments } from '@/features/manage-employee-assignments/model/useEmployeeAssignments'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import Link from 'next/link'
import { format } from 'date-fns'
import { Route } from 'next'

export function EmployeeAssignmentsTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        employeeId: '',
    })
    const { data, isLoading } = useEmployeeAssignments({ ...debouncedFilters, page, size })

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <Input
                    placeholder={t('assignments.employeeId')}
                    value={filters.employeeId}
                    onChange={(e) => updateFilter('employeeId', e.target.value)}
                    className="max-w-xs"
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('assignments.employee')}</TableHead>
                        <TableHead>{t('assignments.item')}</TableHead>
                        <TableHead>{t('assignments.quantity')}</TableHead>
                        <TableHead>{t('assignments.assignedDate')}</TableHead>
                        <TableHead>{t('assignments.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((assignment: any) => (
                        <TableRow key={assignment.id}>
                            <TableCell>
                                <Link href={`/staff/employees/${assignment.employeeId}` as Route} className="underline">
                                    {assignment.employeeName}
                                </Link>
                            </TableCell>
                            <TableCell>{assignment.itemName}</TableCell>
                            <TableCell>{assignment.quantity}</TableCell>
                            <TableCell>
                                {assignment.assignedDate ? format(new Date(assignment.assignedDate), 'dd.MM.yyyy') : '—'}
                            </TableCell>
                            <TableCell>{assignment.status}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/staff/assignments/${assignment.id}` as Route}>{t('common.view')}</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={page === 0}>
                    {t('common.previous')}
                </Button>
                <span>{t('common.page')} {page + 1}</span>
                <Button onClick={nextPage} disabled={!data?.content?.length || data.content.length < size}>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    )
}
