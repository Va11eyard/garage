'use client'

import { useWarehouseCell } from '@/features/manage-warehouse-cells/model/useWarehouseCell'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import {Route} from "next";

export function WarehouseCellDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data, isLoading, error } = useWarehouseCell(id)
    if (isLoading) return <Spinner />
    if (error || !data) return <div>{t('common.error')}</div>

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold mb-2">
                {t('warehouseCells.code')}: {data.code}
            </h2>
            <div>
                {t('warehouseCells.description')}: {data.description ?? <span className="text-gov-text-secondary">—</span>}
            </div>
            <div>
                {t('warehouseCells.capacity')}: {data.capacity ?? <span className="text-gov-text-secondary">—</span>}
            </div>
            <div>
                {t('warehouses.title')}: {data.warehouseName ?? <span className="text-gov-text-secondary">—</span>}
            </div>
            <div>
                {t('warehouseZones.title')}: {data.zoneName ?? <span className="text-gov-text-secondary">—</span>}
            </div>
            <div className="flex gap-3 mt-6">
                <Link href={`/directories/warehouse-cells/${id}/edit` as Route}>
                    <Button variant="default" size="sm">{t('common.edit')}</Button>
                </Link>
            </div>
        </div>
    )
}
