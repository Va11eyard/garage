'use client'

import { useReceipt } from '@/features/manage-receipts/model/useReceipt'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import Link from 'next/link'

export function ReceiptDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: receipt, isLoading } = useReceipt(id)

    if (isLoading) return <div>{t('common.loading')}</div>
    if (!receipt) return <div>{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Документ поступления #{receipt.documentNumber}</h1>
                {receipt.status === 'DRAFT' && (
                    <Link href={`/inventory/receipts/${id}/edit`}>
                        <Button>{t('common.edit')}</Button>
                    </Link>
                )}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('receipts.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('documents.documentNumber')}: </span>
                        <span>{receipt.documentNumber}</span>
                    </div>
                    <div>
                        <span className="font-semibold">{t('documents.documentDate')}: </span>
                        <span>{new Date(receipt.documentDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Статус: </span>
                        <span className={`px-2 py-1 rounded ${
                            receipt.status === 'POSTED' ? 'bg-green-100 text-green-800' :
                            receipt.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {receipt.status}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {receipt.lines && receipt.lines.length > 0 && (
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
                                    <TableHead>Цена</TableHead>
                                    <TableHead>Сумма</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {receipt.lines.map((line, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{line.itemId}</TableCell>
                                        <TableCell>{line.quantity}</TableCell>
                                        <TableCell>{line.price || '-'}</TableCell>
                                        <TableCell>{line.price && line.quantity ? (line.price * line.quantity).toFixed(2) : '-'}</TableCell>
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
