'use client'

import { useQualityCategories } from '@/features/manage-quality-categories/model/useQualityCategories'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import Link from 'next/link'
import { Service } from '@/shared/api/generated/__swagger_client'
import { toast } from 'sonner'
import { useState } from 'react'
import { Route } from 'next'

export default function QualityCategoriesPage() {
    const { t } = useTranslation()
    const { data, isLoading, refetch } = useQualityCategories()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm(t('qualityCategory.deleteConfirm'))) return

        setDeletingId(id)
        try {
            await Service.delete4(id)
            toast.success(t('common.success'))
            refetch()
        } catch (error) {
            toast.error(t('common.error'))
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('qualityCategory.title') }
            ]} />

            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900">{t('qualityCategory.title')}</h1>
                <p className="text-gov-gray-600 mt-2">
                    {t('sidebar.qualityCategories')}
                </p>
            </div>

            <GovCard>
                <GovCardHeader>
                    <div className="flex justify-between items-center">
                        <GovCardTitle>{t('qualityCategory.title')}</GovCardTitle>
                        <GovButton asChild>
                            <Link href="/directories/quality-categories/create">
                                {t('qualityCategory.createCategory')}
                            </Link>
                        </GovButton>
                    </div>
                </GovCardHeader>
                <GovCardContent>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('qualityCategory.code')}</TableHead>
                                    <TableHead>{t('qualityCategory.name')}</TableHead>
                                    <TableHead>{t('qualityCategory.description')}</TableHead>
                                    <TableHead>{t('common.status')}</TableHead>
                                    <TableHead>{t('common.actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-mono">{category.code}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.description || '—'}</TableCell>
                                        <TableCell>
                                            <Badge variant={category.active ? 'default' : 'secondary'}>
                                                {category.active ? t('common.active') : t('common.inactive')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <GovButton variant="ghost" size="sm" asChild>
                                                    <Link href={`/directories/quality-categories/${category.id}/edit` as Route}>
                                                        {t('common.edit')}
                                                    </Link>
                                                </GovButton>
                                                <GovButton
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(category.id!)}
                                                    disabled={deletingId === category.id}
                                                    className="text-red-600"
                                                >
                                                    {deletingId === category.id ? t('common.loading') : t('common.delete')}
                                                </GovButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </GovCardContent>
            </GovCard>
        </div>
    )
}
