'use client'

import { useQualityCategory } from '@/features/manage-quality-categories/model/useQualityCategory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import Link from 'next/link'

export function QualityCategoryDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: category, isLoading } = useQualityCategory(id)

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!category) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{category.name}</h1>
                <Link href={`/directories/quality-categories/${id}/edit` as any}>
                    <Button>{t('common.edit')}</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('qualityCategory.details')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('qualityCategory.name')}: </span>
                        <span>{category.name}</span>
                    </div>
                    {category.code && (
                        <div>
                            <span className="font-semibold">{t('qualityCategory.code')}: </span>
                            <span>{category.code}</span>
                        </div>
                    )}
                    {category.description && (
                        <div>
                            <span className="font-semibold">{t('common.description')}: </span>
                            <span>{category.description}</span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
