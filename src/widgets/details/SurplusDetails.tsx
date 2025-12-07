'use client'

import { useInventorySurplus } from '@/features/manage-inventory-surpluses/model/useInventorySurplus'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import Link from 'next/link'

export function SurplusDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: surplus, isLoading } = useInventorySurplus(id)

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!surplus) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Документ излишков #{surplus.docNumber}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('surplus.details')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('documents.documentNumber')}: </span>
                        <span>{surplus.docNumber}</span>
                    </div>
                    <div>
                        <span className="font-semibold">{t('documents.documentDate')}: </span>
                        <span>{surplus.docDate ? new Date(surplus.docDate).toLocaleDateString() : '-'}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Статус: </span>
                        <span className={`px-2 py-1 rounded ${
                            surplus.status === 'POSTED' ? 'bg-green-100 text-green-800' :
                            surplus.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {surplus.status}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {surplus.lines && surplus.lines.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Строки документа</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Номенклатура</TableHead>
                                    <TableHead>Количество</TableHead>
                                    <TableHead>Категория качества</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {surplus.lines.map((line: any, idx: number) => (
                                    <TableRow key={idx}>
                                        <TableCell>{line.itemId}</TableCell>
                                        <TableCell>{line.quantity}</TableCell>
                                        <TableCell>{line.qualityCategoryId || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
