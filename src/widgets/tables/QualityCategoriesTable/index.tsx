'use client'

import { useQualityCategoriesSearch } from '@/features/manage-quality-categories/model/useQualityCategoriesSearch'
import { useDeleteQualityCategory } from '@/features/manage-quality-categories/model/useDeleteQualityCategory'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { toast } from 'sonner'
import Link from 'next/link'

export function QualityCategoriesTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ q: '' })
    const { data, isLoading } = useQualityCategoriesSearch({
        q: debouncedFilters.q || undefined,
        page,
        size,
    })
    const deleteMutation = useDeleteQualityCategory()
    const confirmDialog = useConfirmDialog()

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('qualityCategory.deleteConfirm'),
            'Вы уверены, что хотите удалить эту категорию качества?',
            () => {
                deleteMutation.mutate(id, {
                    onSuccess: () => toast.success(t('common.success')),
                    onError: () => toast.error(t('common.error')),
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
                        <label className="block text-sm font-medium mb-1">{t('common.search')}</label>
                        <Input
                            placeholder={t('common.search')}
                            value={filters.q}
                            onChange={(e) => updateFilter('q', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Link href="/directories/quality-categories/create">
                    <Button variant="default" className="shrink-0">{t('qualityCategory.createCategory')}</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('qualityCategory.code')}</TableHead>
                        <TableHead>{t('qualityCategory.name')}</TableHead>
                        <TableHead>{t('qualityCategory.description')}</TableHead>
                        <TableHead>{t('organizations.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((category: any) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.code}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description || '-'}</TableCell>
                            <TableCell>
                                <span className={category.active ? 'text-green-600' : 'text-red-600'}>
                                    {category.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link href={`/directories/quality-categories/${category.id}/edit` as any}>
                                    <Button variant="ghost" size="sm">{t('common.edit')}</Button>
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
