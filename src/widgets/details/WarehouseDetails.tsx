'use client'

import { useWarehouse } from '@/features/manage-warehouses/model/useWarehouse'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Route } from 'next'
import Link from 'next/link'

export function WarehouseDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: warehouse, isLoading } = useWarehouse(id)

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!warehouse) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{warehouse.name}</h1>
                <div className="flex gap-2">
                    <Link href={`/directories/warehouses/${id}/edit`}>
                        <Button>{t('common.edit')}</Button>
                    </Link>
                    <Link href={`/directories/warehouses/${id}/structure` as Route}>
                        <Button variant="outline">{t('warehouses.structure')}</Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('warehouses.details')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('warehouses.name')}: </span>
                        <span>{warehouse.name}</span>
                    </div>
                    {warehouse.code && (
                        <div>
                            <span className="font-semibold">{t('warehouses.code')}: </span>
                            <span>{warehouse.code}</span>
                        </div>
                    )}
                    {warehouse.address && (
                        <div>
                            <span className="font-semibold">{t('warehouses.address')}: </span>
                            <span>{warehouse.address}</span>
                        </div>
                    )}
                    {warehouse.description && (
                        <div>
                            <span className="font-semibold">{t('warehouses.description')}: </span>
                            <span>{warehouse.description}</span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
