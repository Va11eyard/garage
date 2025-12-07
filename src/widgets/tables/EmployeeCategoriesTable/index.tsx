'use client'

import { useEmployeeCategories } from '@/features/manage-employee-categories/model/useEmployeeCategories'
import { useDeleteEmployeeCategory } from '@/features/manage-employee-categories/model/useDeleteEmployeeCategory'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'

export function EmployeeCategoriesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { filters, debouncedFilters, updateFilter } = useFilters({ code: '', name: '' })
    const { data, isLoading } = useEmployeeCategories()
    const deleteMutation = useDeleteEmployeeCategory()

    const handleDelete = (id: string) => {
        if (confirm(t('common.confirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    // Filter data locally since the hook doesn't support filters
    const filteredData = data?.filter((category: any) => {
        const matchesCode = !debouncedFilters.code || category.code?.toLowerCase().includes(debouncedFilters.code.toLowerCase())
        const matchesName = !debouncedFilters.name || category.name?.toLowerCase().includes(debouncedFilters.name.toLowerCase())
        return matchesCode && matchesName
    })

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('employeeCategories.code')}</label>
                        <Input
                            placeholder={t('employeeCategories.code')}
                            value={filters.code}
                            onChange={(e) => updateFilter('code', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('employeeCategories.name')}</label>
                        <Input
                            placeholder={t('employeeCategories.name')}
                            value={filters.name}
                            onChange={(e) => updateFilter('name', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/directories/employee-categories/create">{t('employeeCategories.createCategory')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('employeeCategories.code')}</TableHead>
                        <TableHead>{t('employeeCategories.name')}</TableHead>
                        {!isMobile && <TableHead>{t('employeeCategories.description')}</TableHead>}
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData?.map((category: any) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.code}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            {!isMobile && <TableCell>{category.description || '-'}</TableCell>}
                            <TableCell>
                                <span className={category.active ? 'text-green-600' : 'text-red-600'}>
                                    {category.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link href={`/directories/employee-categories/${category.id}` as Route}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.view')}
                                    </Button>
                                </Link>
                                <Link href={`/directories/employee-categories/${category.id}/edit` as Route}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.edit')}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(category.id!)}
                                >
                                    {t('common.delete')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
