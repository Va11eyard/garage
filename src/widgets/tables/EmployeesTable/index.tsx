'use client'

import { useEmployees } from '@/features/manage-employees/model/useEmployees'
import { useDeleteEmployee } from '@/features/manage-employees/model/useDeleteEmployee'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'

export function EmployeesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ organizationId: '', orgUnitId: '' })
    const { data, isLoading } = useEmployees({ ...debouncedFilters, page, size })
    const deleteMutation = useDeleteEmployee()

    const handleDelete = (id: string) => {
        if (confirm(t('employees.dismissEmployee'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <Button asChild>
                    <Link href="/staff/employees/hire">{t('employees.createEmployee')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('employees.person')}</TableHead>
                        <TableHead>{t('employees.organization')}</TableHead>
                        {!isMobile && <TableHead>{t('employees.position')}</TableHead>}
                        {!isMobile && <TableHead>{t('employees.hireDate')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((employee: any) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.personFullName}</TableCell>
                            <TableCell>{employee.organizationName}</TableCell>
                            {!isMobile && <TableCell>{employee.position || '-'}</TableCell>}
                            {!isMobile && <TableCell>{employee.hireDate || '-'}</TableCell>}
                            <TableCell>
                                <Link href={`/staff/employees/${employee.id}/edit`}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.edit')}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(employee.id!)}
                                >
                                    {t('employees.dismissEmployee')}
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
