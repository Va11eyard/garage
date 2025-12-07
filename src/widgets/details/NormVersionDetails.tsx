'use client'

import { useNormVersion } from '@/features/manage-norms/model/useNormVersion'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

export function NormVersionDetails({ normId, versionId }: { normId: string; versionId: string }) {
    const { t } = useTranslation()
    const { data: version, isLoading } = useNormVersion(normId, versionId)

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!version) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>{t('norms.versionInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('norms.version')}: </span>
                        <span>{version.version}</span>
                    </div>
                    <div>
                        <span className="font-semibold">{t('norms.effectiveDate')}: </span>
                        <span>{new Date(version.effectiveDate).toLocaleDateString()}</span>
                    </div>
                    {version.expiryDate && (
                        <div>
                            <span className="font-semibold">{t('norms.expiryDate')}: </span>
                            <span>{new Date(version.expiryDate).toLocaleDateString()}</span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {version.items && version.items.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('norms.items')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('items.name')}</TableHead>
                                    <TableHead>{t('norms.quantity')}</TableHead>
                                    <TableHead>{t('norms.period')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {version.items.map((item: any, idx: number) => (
                                    <TableRow key={idx}>
                                        <TableCell>{item.itemName || item.itemId}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.periodMonths} {t('norms.months')}</TableCell>
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
