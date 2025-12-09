'use client'

import { useMemo } from 'react'
import { useUnits } from '@/features/manage-units/model/useUnits'
import { useDeleteUnit } from '@/features/manage-units/model/useDeleteUnit'
import { useFilters } from '@/shared/hooks/use-filters'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function UnitsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { filters, updateFilter } = useFilters({ code: '', name: '' })
    const { data, isLoading } = useUnits()
    const deleteMutation = useDeleteUnit()
    const confirmDialog = useConfirmDialog()

    // Client-side filtering since backend doesn't support filter parameters
    const filteredData = useMemo(() => {
        if (!data) return []
        
        return data.filter((unit: any) => {
            const matchesCode = !filters.code || unit.code?.toLowerCase().includes(filters.code.toLowerCase())
            const matchesName = !filters.name || unit.name?.toLowerCase().includes(filters.name.toLowerCase())
            return matchesCode && matchesName
        })
    }, [data, filters.code, filters.name])

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('unitOfMeasure.deleteConfirm'),
            t('common.deleteWarning') || 'Вы уверены, что хотите удалить эту единицу измерения?',
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
                        <label className="block text-sm font-medium mb-1">{t('unitOfMeasure.code')}</label>
                        <Input
                            placeholder={t('unitOfMeasure.code')}
                            value={filters.code}
                            onChange={(e) => updateFilter('code', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('unitOfMeasure.name')}</label>
                        <Input
                            placeholder={t('unitOfMeasure.name')}
                            value={filters.name}
                            onChange={(e) => updateFilter('name', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button asChild className="shrink-0 text-black">
                    <Link href="/directories/units/create">{t('unitOfMeasure.createUnit')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('unitOfMeasure.code')}</TableHead>
                        <TableHead>{t('unitOfMeasure.name')}</TableHead>
                        {!isMobile && <TableHead>{t('unitOfMeasure.shortName')}</TableHead>}
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((unit: any) => (
                        <TableRow key={unit.id}>
                            <TableCell>{unit.code}</TableCell>
                            <TableCell>{unit.name}</TableCell>
                            {!isMobile && <TableCell>{unit.shortName || '-'}</TableCell>}
                            <TableCell>
                                <span className={unit.active ? 'text-green-600' : 'text-red-600'}>
                                    {unit.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link href={`/directories/units/${unit.id}`}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.view')}
                                    </Button>
                                </Link>
                                <Link href={`/directories/units/${unit.id}/edit`}>
                                    <Button variant="ghost" size="sm">
                                        {t('common.edit')}
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(unit.id!)}
                                >
                                    {t('common.delete')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-end items-center">
                <span className="text-sm text-gov-text-secondary">
                    {t('common.all')}: {filteredData.length}
                </span>
            </div>

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
