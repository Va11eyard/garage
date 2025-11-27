'use client'

import { useStaff } from '@/features/manage-staff/model/useStaff'
import { useDismissStaff } from '@/features/manage-staff/model/useDismissStaff'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import { Spinner } from '@/shared/ui/spinner'
import { Route } from 'next'

export function StaffTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ personnelNumber: '' })
    const { data, isLoading } = useStaff({ 
        personnelNumber: debouncedFilters.personnelNumber || undefined, 
        page, 
        size 
    })
    const dismissMutation = useDismissStaff()

    const handleDismiss = (id: string) => {
        if (confirm(t('staff.dismissConfirm'))) {
            dismissMutation.mutate({ id, data: { dismissalDate: new Date().toISOString().split('T')[0] } }, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('staff.personnelNumber')}</label>
                        <Input
                            placeholder={t('staff.personnelNumber')}
                            value={filters.personnelNumber}
                            onChange={e => updateFilter('personnelNumber', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button variant="default" asChild className="shrink-0 text-black">
                    <Link href={"/staff/hiring" as Route}>{t('staff.hire')}</Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('staff.personnelNumber')}</TableHead>
                        <TableHead>{t('staff.fullName')}</TableHead>
                        <TableHead>{t('staff.position')}</TableHead>
                        <TableHead>{t('staff.rank')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((employee: any) => (
                        <TableRow key={employee.id}>
                            <TableCell>
                                <Link href={`/staff/${employee.id}` as Route} className="underline">{employee.personnelNumber}</Link>
                            </TableCell>
                            <TableCell>{`${employee.lastName} ${employee.firstName} ${employee.middleName}`}</TableCell>
                            <TableCell>{employee.positionName}</TableCell>
                            <TableCell>{employee.rankName}</TableCell>
                            <TableCell>
                                <Link href={`/staff/${employee.id}/edit` as Route}>
                                    <Button variant="ghost" size="sm">{t('common.edit')}</Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDismiss(employee.id!)}
                                >
                                    {t('staff.dismiss')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={page === 0}>{t('pagination.prev')}</Button>
                <span className="text-sm text-gov-text-secondary">
          {t('pagination.page')} {page + 1} {t('pagination.of')} {data?.totalPages ?? 1}
        </span>
                <Button onClick={nextPage} disabled={data?.last || page >= (data?.totalPages ?? 1) - 1}>{t('pagination.next')}</Button>
            </div>
        </div>
    )
}
