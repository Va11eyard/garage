'use client'

import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useDeleteOrganization } from '@/features/manage-organizations/model/useDeleteOrganization'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'

export function OrganizationsTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ code: '', name: '' })
    const { data, isLoading } = useOrganizations({ ...debouncedFilters, page, size })
    const deleteMutation = useDeleteOrganization()

    const handleDelete = (id: string) => {
        if (confirm(t('organizations.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('organizations.deleteSuccess')),
                onError: () => toast.error(t('organizations.deleteError')),
            })
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('organizations.code')}</label>
                        <Input
                            placeholder={t('organizations.code')}
                            value={filters.code}
                            onChange={(e) => updateFilter('code', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('organizations.name')}</label>
                        <Input
                            placeholder={t('organizations.name')}
                            value={filters.name}
                            onChange={(e) => updateFilter('name', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Link href="/directories/organizations/create"> 
                    <Button variant="default" className="shrink-0">{t('organizations.create')}</Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('organizations.code')}</TableHead>
                        <TableHead>{t('organizations.name')}</TableHead>
                        <TableHead>{t('organizations.shortName')}</TableHead>
                        <TableHead>{t('organizations.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((org: any) => (
                        <TableRow key={org.id}>
                            <TableCell>{org.code}</TableCell>
                            <TableCell>{org.name}</TableCell>
                            <TableCell>{org.shortName}</TableCell>
                            <TableCell>
                                <span className={org.active ? 'text-green-600' : 'text-red-600'}>
                                    {org.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link href={`/directories/organizations/${org.id}/edit`}>
                                    <Button variant="ghost" size="sm">{t('common.edit')}</Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(org.id!)}
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
                <Button onClick={nextPage} disabled={data?.last || page >= (data?.totalPages ?? 1) - 1}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
