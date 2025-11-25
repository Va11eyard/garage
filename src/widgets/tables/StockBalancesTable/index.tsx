'use client'

import { useStockBalanceByWarehouse } from '@/features/manage-stock-balances/model/useStockBalanceByWarehouse'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Label } from '@/shared/ui/label'
import { Spinner } from '@/shared/ui/spinner'
import { useState } from 'react'

export function StockBalancesTable() {
    const { t } = useTranslation()
    const [selectedWarehouse, setSelectedWarehouse] = useState<string>('')
    const { data: warehouses } = useWarehouses({})
    const { data: balances, isLoading } = useStockBalanceByWarehouse(selectedWarehouse || undefined)

    return (
        <div className="space-y-4">
            <div className="w-full max-w-md">
                <Label>{t('stockBalances.warehouse')}</Label>
                <select
                    className="w-full border rounded px-3 py-2"
                    value={selectedWarehouse}
                    onChange={(e) => setSelectedWarehouse(e.target.value)}
                >
                    <option value="">{t('stockBalances.viewByWarehouse')}</option>
                    {warehouses?.content?.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id!}>
                            {warehouse.name}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading && <Spinner />}

            {balances && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('stockBalances.item')}</TableHead>
                            <TableHead>{t('stockBalances.zone')}</TableHead>
                            <TableHead>{t('stockBalances.cell')}</TableHead>
                            <TableHead>{t('stockBalances.quantity')}</TableHead>
                            <TableHead>{t('stockBalances.reserved')}</TableHead>
                            <TableHead>{t('stockBalances.available')}</TableHead>
                            <TableHead>{t('stockBalances.qualityCategory')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Note: StockBalanceDto structure needs to be checked */}
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                {t('common.noData')}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
