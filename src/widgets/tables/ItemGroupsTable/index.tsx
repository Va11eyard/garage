'use client'

import { useState, useMemo } from 'react'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useDeleteItemGroup } from '@/features/manage-item-groups/model/useDeleteItemGroup'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ItemGroupsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { data, isLoading } = useItemGroups()
    const deleteMutation = useDeleteItemGroup()
    const confirmDialog = useConfirmDialog()
    const [codeFilter, setCodeFilter] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    // Create a map of item group IDs to names for parent lookup
    const groupMap = useMemo(() => {
        if (!data) return new Map()
        return new Map(data.map((group: any) => [group.id, group.name]))
    }, [data])

    const filteredData = useMemo(() => {
        if (!data) return []
        
        return data.filter((group: any) => {
            const matchesCode = !codeFilter || group.code?.toLowerCase().includes(codeFilter.toLowerCase())
            const matchesName = !nameFilter || group.name?.toLowerCase().includes(nameFilter.toLowerCase())
            return matchesCode && matchesName
        })
    }, [data, codeFilter, nameFilter])

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('itemGroup.deleteConfirm'),
            t('common.deleteWarning') || 'Вы уверены, что хотите удалить эту группу?',
            () => {
                deleteMutation.mutate(id, {
                    onSuccess: () => toast.success(t('common.success')),
                    onError: (error: any) => toast.error(getErrorMessage(error)),
                })
            }
        )
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('itemGroup.code')}</label>
                        <Input
                            placeholder={t('itemGroup.code')}
                            value={codeFilter}
                            onChange={(e) => setCodeFilter(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('itemGroup.name')}</label>
                        <Input
                            placeholder={t('itemGroup.name')}
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/directories/item-groups/create">{t('itemGroup.createGroup')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('itemGroup.code')}</TableHead>
                        <TableHead>{t('itemGroup.name')}</TableHead>
                        {!isMobile && <TableHead>{t('itemGroup.parentGroup')}</TableHead>}
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((group: any) => (
                        <TableRow key={group.id}>
                            <TableCell>{group.code}</TableCell>
                            <TableCell>{group.name}</TableCell>
                            {!isMobile && <TableCell>{group.parentId ? (groupMap.get(group.parentId) || '-') : '-'}</TableCell>}
                            <TableCell>
                                <span className={group.active ? 'text-green-600' : 'text-red-600'}>
                                    {group.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link href={`/directories/item-groups/${group.id}`}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.view')}
                                    </Button>
                                </Link>
                                <Link href={`/directories/item-groups/${group.id}/edit`}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.edit')}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(group.id!)}
                                >
                                    {t('common.delete')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GovConfirmModal
                isOpen={confirmDialog.isOpen}
                onClose={confirmDialog.hideConfirm}
                onConfirm={confirmDialog.handleConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmText={t('common.delete')}
                cancelText={t('common.cancel')}
                variant="danger"
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
