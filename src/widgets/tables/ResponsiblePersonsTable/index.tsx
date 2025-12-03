'use client'

import { useEmployees } from '@/features/manage-employees/model/useEmployees'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import Link from 'next/link'
import { Route } from 'next'

export function ResponsiblePersonsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({
        fullName: '',
        personnelNumber: ''
    })
    
    const { data, isLoading } = useEmployees({ 
        ...debouncedFilters,
        page, 
        size 
    })
    
    const responsibleEmployees = data?.content?.filter((emp: any) => emp.responsible) || []
    const filteredData = { ...data, content: responsibleEmployees }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold text-gov-gray-900">{t('breadcrumbs.responsiblePersons')}</h1>
                <p className="text-gov-gray-600 mt-2">Сотрудники с правами ответственного лица</p>
            </div>

            <div className="flex gap-4 flex-1 flex-wrap">
                <div>
                    <label className="block text-sm font-medium mb-1">{t('staff.personnelNumber')}</label>
                    <Input
                        placeholder={t('staff.personnelNumber')}
                        value={filters.personnelNumber}
                        onChange={(e) => updateFilter('personnelNumber', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">{t('staff.fullName')}</label>
                    <Input
                        placeholder={t('staff.fullName')}
                        value={filters.fullName}
                        onChange={(e) => updateFilter('fullName', e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('staff.personnelNumber')}</TableHead>
                        <TableHead>{t('staff.fullName')}</TableHead>
                        {!isMobile && <TableHead>{t('staff.position')}</TableHead>}
                        {!isMobile && <TableHead>{t('employees.organization')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData?.content?.map((employee: any) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.personnelNumber}</TableCell>
                            <TableCell>{employee.fullName}</TableCell>
                            {!isMobile && <TableCell>{employee.positionName || '-'}</TableCell>}
                            {!isMobile && <TableCell>{employee.organizationName || '-'}</TableCell>}
                            <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/staff/employees/${employee.id}` as Route}>
                                        {t('common.view')}
                                    </Link>
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
                    {t('pagination.page')} {page + 1} {t('pagination.of')} {filteredData?.totalPages ?? 1}
                </span>
                <Button onClick={nextPage} disabled={filteredData?.last || page >= (filteredData?.totalPages ?? 1) - 1}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
