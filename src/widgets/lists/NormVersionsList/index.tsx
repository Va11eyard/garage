'use client'

import { useNormVersions } from '@/features/manage-norms/model/useNormVersions'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import Link from 'next/link'

export function NormVersionsList({ normId }: { normId: string }) {
    const { t } = useTranslation()
    const { data: versions, isLoading } = useNormVersions(normId)

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{t('norms.versions')}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('norms.versionsList')}</CardTitle>
                </CardHeader>
                <CardContent>
                    {!versions || versions.length === 0 ? (
                        <p className="text-muted-foreground">{t('common.noData')}</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('norms.version')}</TableHead>
                                    <TableHead>{t('norms.effectiveDate')}</TableHead>
                                    <TableHead>{t('norms.expiryDate')}</TableHead>
                                    <TableHead>{t('common.actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {versions.map((version: any) => (
                                    <TableRow key={version.id}>
                                        <TableCell>{version.version}</TableCell>
                                        <TableCell>{new Date(version.effectiveDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{version.expiryDate ? new Date(version.expiryDate).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell>
                                            <Link href={`/directories/norms/${normId}/versions/${version.id}`}>
                                                <Button variant="outline" size="sm">{t('common.view')}</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
