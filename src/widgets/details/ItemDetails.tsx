'use client'

import { useItem } from '@/features/manage-items/model/useItem'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'

export function ItemDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data, isLoading, error } = useItem(id)
    if (isLoading) return <Spinner />
    if (error || !data) return <div>{t('common.error')}</div>

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
            <div>{t('items.code')}: {data.code}</div>
            <div>{t('items.itemGroup')}: {data.groupCode ?? <span className="text-gov-text-secondary">—</span>}</div>
            <div>{t('items.unitOfMeasure')}: {data.baseUnitCode ?? <span className="text-gov-text-secondary">—</span>}</div>
            <div>{t('items.barcode')}: {data.barcode ?? <span className="text-gov-text-secondary">—</span>}</div>
            <div className="flex gap-3 mt-6">
                <Link href={`/directories/items/${id}/edit`}>
                    <Button variant="default" size="sm">{t('common.edit')}</Button>
                </Link>
            </div>
        </div>
    )
}
