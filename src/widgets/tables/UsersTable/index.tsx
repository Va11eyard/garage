'use client'

import { useUsers } from '@/features/manage-users/model/useUsers'
import { useDeleteUser } from '@/features/manage-users/model/useDeleteUser'
import { useRestoreUser } from '@/features/manage-users/model/useRestoreUser'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'

export function UsersTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters<{ username: string }>({ username: '' })
    const { data, isLoading } = useUsers({ username: debouncedFilters.username, page, size })
    const deleteMutation = useDeleteUser()
    const restoreMutation = useRestoreUser()

    const handleDelete = (id: string) => {
        if (confirm(t('users.blockConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('users.blockSuccess')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    const handleRestore = (id: string) => {
        restoreMutation.mutate(id, {
            onSuccess: () => toast.success(t('users.unblockSuccess')),
            onError: () => toast.error(t('common.error')),
        })
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4 mb-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('users.username')}</label>
                        <Input
                            placeholder={t('users.username')}
                            value={filters.username}
                            onChange={(e) => updateFilter('username', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/admin/users/create">{t('users.createUser')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('users.username')}</TableHead>
                        <TableHead>{t('users.fullName')}</TableHead>
                        {!isMobile && <TableHead>{t('users.roles')}</TableHead>}
                        <TableHead>{t('users.enabled')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((u: any) => (
                        <TableRow key={u.id}>
                            <TableCell>{u.username}</TableCell>
                            <TableCell>{u.fullName}</TableCell>
                            {!isMobile && <TableCell>{u.roles?.join(', ')}</TableCell>}
                            <TableCell>{u.enabled ? t('common.yes') : t('common.no')}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/admin/users/${u.id}/edit`}>
                                        {t('common.edit')}
                                    </Link>
                                </Button>
                                {u.enabled ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600"
                                        onClick={() => handleDelete(u.id!)}
                                    >
                                        {t('users.blockUser')}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600"
                                        onClick={() => handleRestore(u.id!)}
                                    >
                                        {t('users.unblockUser')}
                                    </Button>
                                )}
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