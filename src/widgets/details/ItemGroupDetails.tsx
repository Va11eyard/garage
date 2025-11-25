'use client'

import { useItemGroup } from '@/features/manage-item-groups/model/useItemGroup'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import Link from 'next/link'

export function ItemGroupDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: itemGroup, isLoading } = useItemGroup(id)

    if (isLoading) return <div>{t('common.loading')}</div>
    if (!itemGroup) return <div>{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{itemGroup.name}</h1>
                <Link href={`/directories/item-groups/${id}/edit`}>
                    <Button>{t('common.edit')}</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('itemGroup.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('itemGroup.code')}: </span>
                        <span>{itemGroup.code}</span>
                    </div>
                    <div>
                        <span className="font-semibold">{t('itemGroup.name')}: </span>
                        <span>{itemGroup.name}</span>
                    </div>
                    {itemGroup.parentId && (
                        <div>
                            <span className="font-semibold">{t('itemGroup.parentGroup')}: </span>
                            <span>{itemGroup.parentId}</span>
                        </div>
                    )}
                    <div>
                        <span className="font-semibold">{t('common.active')}: </span>
                        <span>{itemGroup.active ? t('common.yes') : t('common.no')}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
