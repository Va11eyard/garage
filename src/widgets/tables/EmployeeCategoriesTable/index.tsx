'use client'

import { useEmployeeCategories } from '@/features/manage-employee-categories/model/useEmployeeCategories'
import { useDeleteEmployeeCategory } from '@/features/manage-employee-categories/model/useDeleteEmployeeCategory'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { Route } from 'next'

export function EmployeeCategoriesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
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

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <Button asChild className="text-black">
                    <Link href="/directories/employee-categories/create">{t('employeeCategories.createCategory')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('employeeCategories.code')}</TableHead>
                        <TableHead>{t('employeeCategories.name')}</TableHead>
                        {!isMobile && <TableHead>{t('employeeCategories.description')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((category: any) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.code}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            {!isMobile && <TableCell>{category.description || '-'}</TableCell>}
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
