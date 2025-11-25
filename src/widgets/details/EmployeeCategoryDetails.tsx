'use client'

import { useEmployeeCategory } from '@/features/manage-employee-categories/model/useEmployeeCategory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import Link from 'next/link'

export function EmployeeCategoryDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: category, isLoading } = useEmployeeCategory(id)

    if (isLoading) return <div>{t('common.loading')}</div>
    if (!category) return <div>{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{category.name}</h1>
                <Link href={`/directories/employee-categories/${id}/edit`}>
                    <Button>{t('common.edit')}</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('employeeCategories.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('employeeCategories.code')}: </span>
                        <span>{category.code}</span>
                    </div>
                    <div>
                        <span className="font-semibold">{t('employeeCategories.name')}: </span>
                        <span>{category.name}</span>
                    </div>
                    {category.description && (
                        <div>
                            <span className="font-semibold">{t('employeeCategories.description')}: </span>
                            <span>{category.description}</span>
                        </div>
                    )}
                    <div>
                        <span className="font-semibold">{t('common.active')}: </span>
                        <span>{category.active ? t('common.yes') : t('common.no')}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
