'use client'

import { useState, useEffect } from 'react'
import { useItemSupplyNorms } from '@/features/manage-item-supply-norms/model/useItemSupplyNorms'
import { useDeleteItemSupplyNorm } from '@/features/manage-item-supply-norms/model/useDeleteItemSupplyNorm'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { toast } from 'sonner'
import Link from 'next/link'
import { getErrorMessage } from '@/shared/utils/error-handler'
import { EmployeeCategoryService } from '@/features/manage-employee-categories/model/service'
import { ItemService } from '@/features/manage-items/model/service'
import { Route } from 'next'

export function ItemSupplyNormsTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ 
        employeeCategoryId: 'all',
        itemId: 'all'
    })
    const { data, isLoading } = useItemSupplyNorms({ 
        employeeCategoryId: debouncedFilters.employeeCategoryId === 'all' ? undefined : debouncedFilters.employeeCategoryId,
        itemId: debouncedFilters.itemId === 'all' ? undefined : debouncedFilters.itemId,
        page, 
        size 
    })
    const deleteMutation = useDeleteItemSupplyNorm()
    const confirmDialog = useConfirmDialog()
    
    const [categories, setCategories] = useState<any[]>([])
    const [items, setItems] = useState<any[]>([])
    const [loadingFilters, setLoadingFilters] = useState(false)

    useEffect(() => {
        const loadFilterData = async () => {
            setLoadingFilters(true)
            try {
                const categoryService = new EmployeeCategoryService()
                const itemService = new ItemService()
                const [categoriesData, itemsData] = await Promise.all([
                    categoryService.list(),
                    itemService.list()
                ])
                setCategories(categoriesData)
                setItems(itemsData)
            } catch (error) {
                toast.error('Error loading filters')
            } finally {
                setLoadingFilters(false)
            }
        }
        loadFilterData()
    }, [])

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('itemSupplyNorm.deleteConfirm'),
            t('itemSupplyNorm.deleteMessage') || 'Вы уверены, что хотите удалить эту норму снабжения?',
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
                        <label className="block text-sm font-medium mb-1">{t('norm.category')}</label>
                        <Select
                            value={filters.employeeCategoryId}
                            onValueChange={(value) => updateFilter('employeeCategoryId', value)}
                            disabled={loadingFilters}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('common.all')}</SelectItem>
                                {categories.map((cat: any) => (
                                    <SelectItem key={cat.id} value={cat.id!}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('norm.item')}</label>
                        <Select
                            value={filters.itemId}
                            onValueChange={(value) => updateFilter('itemId', value)}
                            disabled={loadingFilters}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('common.all')}</SelectItem>
                                {items.map((item: any) => (
                                    <SelectItem key={item.id} value={item.id!}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Link href="/directories/item-supply-norms/create">
                    <Button variant="default" className="shrink-0">{t('itemSupplyNorm.create')}</Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('norm.category')}</TableHead>
                        <TableHead>{t('norm.item')}</TableHead>
                        <TableHead>{t('norm.quantity')}</TableHead>
                        <TableHead>{t('itemSupplyNorm.wearMonths')}</TableHead>
                        <TableHead>{t('itemSupplyNorm.validFrom')}</TableHead>
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((norm: any) => (
                        <TableRow key={norm.id}>
                            <TableCell>{norm.employeeCategoryName || '-'}</TableCell>
                            <TableCell>{norm.itemName || '-'}</TableCell>
                            <TableCell>{norm.quantity || '-'}</TableCell>
                            <TableCell>{norm.wearMonths ? `${norm.wearMonths} ${t('common.months')}` : '-'}</TableCell>
                            <TableCell>{norm.validFrom ? new Date(norm.validFrom).toLocaleDateString() : '-'}</TableCell>
                            <TableCell>
                                <span className={norm.active ? 'text-green-600' : 'text-red-600'}>
                                    {norm.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link href={`/directories/item-supply-norms/${norm.id}` as Route}>
                                    <Button variant="ghost" size="sm">{t('common.view')}</Button>
                                </Link>
                                <Link href={`/directories/item-supply-norms/${norm.id}/edit`as Route}>
                                    <Button variant="ghost" size="sm">{t('common.edit')}</Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(norm.id!)}
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
