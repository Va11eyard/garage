'use client'

import { usePersons } from '@/features/manage-persons/model/usePersons'
import { useDeletePerson } from '@/features/manage-persons/model/useDeletePerson'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'

export function PersonsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ lastName: '', firstName: '' })
    const { data, isLoading } = usePersons({ 
        lastName: debouncedFilters.lastName || undefined, 
        firstName: debouncedFilters.firstName || undefined, 
        page, 
        size 
    })
    const deleteMutation = useDeletePerson()

    const handleDelete = (id: string) => {
        if (confirm(t('persons.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4 mb-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('persons.lastName')}</label>
                        <Input
                            placeholder={t('persons.lastName')}
                            value={filters.lastName}
                            onChange={(e) => updateFilter('lastName', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('persons.firstName')}</label>
                        <Input
                            placeholder={t('persons.firstName')}
                            value={filters.firstName}
                            onChange={(e) => updateFilter('firstName', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/directories/persons/create">{t('persons.createPerson')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('persons.iin')}</TableHead>
                        <TableHead>{t('persons.fullName')}</TableHead>
                        {!isMobile && <TableHead>{t('persons.birthDate')}</TableHead>}
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((person: any) => (
                        <TableRow key={person.id}>
                            <TableCell>{person.iin}</TableCell>
                            <TableCell>{person.fullName}</TableCell>
                            {!isMobile && <TableCell>{person.birthDate || '-'}</TableCell>}
                            <TableCell>
                                <Link href={`/directories/persons/${person.id}/edit`}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.edit')}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(person.id!)}
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
