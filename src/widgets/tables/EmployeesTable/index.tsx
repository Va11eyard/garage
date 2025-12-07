'use client'

import { useEmployees } from '@/features/manage-employees/model/useEmployees'
import { useDeleteEmployee } from '@/features/manage-employees/model/useDeleteEmployee'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'

export function EmployeesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ 
        organizationId: 'all',
        personnelNumber: ''
    })
    const { data, isLoading } = useEmployees({ 
        organizationId: debouncedFilters.organizationId === 'all' ? undefined : debouncedFilters.organizationId,
        personnelNumber: debouncedFilters.personnelNumber || undefined,
        page, 
        size 
    })
    const { data: organizationsData } = useOrganizations({ page: 0, size: 100 })
    const deleteMutation = useDeleteEmployee()

    const handleDelete = (id: string) => {
        if (confirm(t('common.delete'))) {
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
                        <label className="block text-sm font-medium mb-1">{t('staff.personnelNumber')}</label>
                        <Input
                            placeholder={t('staff.personnelNumber')}
                            value={filters.personnelNumber}
                            onChange={(e) => updateFilter('personnelNumber', e.target.value)}
                            className="w-[200px]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('employees.organization')}</label>
                        <Select
                            value={filters.organizationId}
                            onValueChange={(value) => updateFilter('organizationId', value)}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('common.all')}</SelectItem>
                                {organizationsData?.content?.map((org: any) => (
                                    <SelectItem key={org.id} value={org.id!}>
                                        {org.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button asChild className="shrink-0">
                    <Link href="/staff/employees/hire">{t('employees.createEmployee')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('staff.personnelNumber')}</TableHead>
                        <TableHead>{t('employees.person')}</TableHead>
                        <TableHead>{t('employees.organization')}</TableHead>
                        {!isMobile && <TableHead>{t('employees.position')}</TableHead>}
                        {!isMobile && <TableHead>{t('employees.hireDate')}</TableHead>}
                        {!isMobile && <TableHead>{t('common.status')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((employee: any) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.personnelNumber || '-'}</TableCell>
                            <TableCell>
                                {employee.lastName} {employee.firstName} {employee.middleName}
                            </TableCell>
                            <TableCell>{employee.organizationName || '-'}</TableCell>
                            {!isMobile && <TableCell>{employee.positionName || '-'}</TableCell>}
                            {!isMobile && <TableCell>
                                {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : '-'}
                            </TableCell>}
                            {!isMobile && <TableCell>
                                <span className={employee.active ? 'text-green-600' : 'text-red-600'}>
                                    {employee.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>}
                            <TableCell>
                                <Link href={`/staff/employees/${employee.id}` as Route}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.view')}
                                    </Button>
                                </Link>
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
