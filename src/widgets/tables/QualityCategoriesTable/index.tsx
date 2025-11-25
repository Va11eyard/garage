'use client'

import { useQualityCategories } from '@/features/manage-quality-categories/model/useQualityCategories'
import { useDeleteQualityCategory } from '@/features/manage-quality-categories/model/useDeleteQualityCategory'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { GovTable, GovTableBody, GovTableCell, GovTableHead, GovTableHeader, GovTableRow } from '@/gov-design/components/Table'
import { GovInput } from '@/gov-design/components/Form'
import { GovButton } from '@/gov-design/components/Button'
import { GovConfirmModal } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import { useState } from 'react'
import { Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

export function QualityCategoriesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { filters, debouncedFilters, updateFilter } = useFilters({ code: '', name: '' })
    const { data, isLoading } = useQualityCategories({ ...debouncedFilters, page, size })
    const deleteMutation = useDeleteQualityCategory()
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleDelete = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId, {
                onSuccess: () => {
                    toast.success(t('common.success'))
                    setDeleteId(null)
                },
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    if (isLoading) return <div className="text-center py-8 text-gov-gray-600">{t('common.loading')}</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gov-gray-900">{t('qualityCategory.title')}</h2>
                <GovButton variant="primary">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('qualityCategory.createCategory')}
                </GovButton>
            </div>

            <div className="flex gap-4">
                <GovInput
                    placeholder={t('qualityCategory.code')}
                    value={filters.code}
                    onChange={(e) => updateFilter('code', e.target.value)}
                    className="max-w-xs"
                />
                <GovInput
                    placeholder={t('qualityCategory.name')}
                    value={filters.name}
                    onChange={(e) => updateFilter('name', e.target.value)}
                    className="max-w-xs"
                />
            </div>

            <GovTable>
                <GovTableHeader>
                    <GovTableRow>
                        <GovTableHead>{t('qualityCategory.code')}</GovTableHead>
                        <GovTableHead>{t('qualityCategory.name')}</GovTableHead>
                        {!isMobile && <GovTableHead>{t('qualityCategory.description')}</GovTableHead>}
                        <GovTableHead>{t('common.actions')}</GovTableHead>
                    </GovTableRow>
                </GovTableHeader>
                <GovTableBody>
                    {data?.content?.map((category: any) => (
                        <GovTableRow key={category.id}>
                            <GovTableCell className="font-medium">{category.code}</GovTableCell>
                            <GovTableCell>{category.name}</GovTableCell>
                            {!isMobile && <GovTableCell>{category.description || '-'}</GovTableCell>}
                            <GovTableCell>
                                <div className="flex gap-2">
                                    <GovButton variant="ghost" size="sm">
                                        <Edit className="w-4 h-4 mr-1" />
                                        {t('common.edit')}
                                    </GovButton>
                                    <GovButton
                                        variant="ghost"
                                        size="sm"
                                        className="text-gov-red-500 hover:text-gov-red-600"
                                        onClick={() => setDeleteId(category.id!)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        {t('common.delete')}
                                    </GovButton>
                                </div>
                            </GovTableCell>
                        </GovTableRow>
                    ))}
                </GovTableBody>
            </GovTable>

            <div className="flex justify-between items-center">
                <GovButton variant="outline" onClick={previousPage} disabled={page === 0}>
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {t('pagination.prev')}
                </GovButton>
                <span className="text-sm text-gov-gray-600">
                    {t('pagination.page')} {page + 1} {t('pagination.of')} {data?.totalPages ?? 1}
                </span>
                <GovButton variant="outline" onClick={nextPage} disabled={data?.last}>
                    {t('pagination.next')}
                    <ChevronRight className="w-4 h-4 ml-1" />
                </GovButton>
            </div>

            <GovConfirmModal
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title={t('qualityCategory.deleteConfirm')}
                message="Вы уверены, что хотите удалить эту категорию качества?"
                confirmText={t('common.delete')}
                cancelText={t('common.cancel')}
                variant="danger"
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
