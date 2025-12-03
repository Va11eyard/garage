'use client'

import { useStockBalances } from '@/features/manage-stock-balances/model/useStockBalances'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Spinner } from '@/shared/ui/spinner'
import { useState } from 'react'

export function StockBalancesTable() {
    const { t } = useTranslation()
    const [selectedWarehouse, setSelectedWarehouse] = useState<string>('__ALL__')
    const { data: warehouses } = useWarehouses({})
    const { data: balances, isLoading } = useStockBalances(selectedWarehouse === '__ALL__' ? undefined : selectedWarehouse)

    return (
        <div className="space-y-4">
            <div className="w-full max-w-md">
                <label className="block text-sm font-medium mb-1">{t('stockBalances.warehouse')}</label>
                <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder={t('common.all')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                        {warehouses?.content?.map((warehouse: any) => (
                            <SelectItem key={warehouse.id} value={warehouse.id!}>
                                {warehouse.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                        {balances?.map((balance: any) => (
                            <TableRow key={`${balance.itemId}-${balance.warehouseId}`}>
                                <TableCell>{balance.itemName}</TableCell>
                                <TableCell>{balance.zoneName || '—'}</TableCell>
                                <TableCell>{balance.cellCode || '—'}</TableCell>
                                <TableCell className="text-right">{balance.quantity}</TableCell>
                                <TableCell className="text-right">{balance.reserved || 0}</TableCell>
                                <TableCell className="text-right">{(balance.quantity || 0) - (balance.reserved || 0)}</TableCell>
                                <TableCell>{balance.qualityCategory || '—'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
