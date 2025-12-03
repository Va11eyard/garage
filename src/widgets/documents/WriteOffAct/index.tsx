'use client'

import { useWriteOff } from '@/features/manage-write-offs/model/useWriteOff'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

export function WriteOffAct({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: writeOff, isLoading } = useWriteOff(id)

    const handlePrint = () => {
        window.print()
    }

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!writeOff) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center no-print">
                <h1 className="text-2xl font-bold">{t('writeOffs.act')}</h1>
                <Button onClick={handlePrint}>{t('common.print')}</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-center">АКТ О СПИСАНИИ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="font-semibold">Номер документа: </span>
                            <span>{writeOff.documentNumber}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Дата: </span>
                            <span>{new Date(writeOff.documentDate).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {writeOff.lines && writeOff.lines.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">Перечень списываемого имущества:</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>№</TableHead>
                                        <TableHead>Наименование</TableHead>
                                        <TableHead>Количество</TableHead>
                                        <TableHead>Причина списания</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {writeOff.lines.map((line: any, idx: number) => (
                                        <TableRow key={idx}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{line.itemName || line.itemId}</TableCell>
                                            <TableCell>{line.quantity}</TableCell>
                                            <TableCell>{line.reason || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <span>Председатель комиссии:</span>
                            <span className="border-b border-black w-64">_________________</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Члены комиссии:</span>
                            <span className="border-b border-black w-64">_________________</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
