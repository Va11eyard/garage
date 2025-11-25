'use client'

import { useNorm } from '@/features/manage-norms/model/useNorm'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import Link from 'next/link'

export function NormDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: norm, isLoading } = useNorm(id)

    if (isLoading) return <div>{t('common.loading')}</div>
    if (!norm) return <div>{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Норма обеспечения</h1>
                <Link href={`/directories/norms/${id}/edit`}>
                    <Button>{t('common.edit')}</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Детали нормы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">Количество: </span>
                        <span>{norm.quantity}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Срок носки (мес): </span>
                        <span>{norm.wearPeriodMonths}</span>
                    </div>
                    {norm.validFrom && (
                        <div>
                            <span className="font-semibold">Действует с: </span>
                            <span>{new Date(norm.validFrom).toLocaleDateString()}</span>
                        </div>
                    )}
                    {norm.validTo && (
                        <div>
                            <span className="font-semibold">Действует до: </span>
                            <span>{new Date(norm.validTo).toLocaleDateString()}</span>
                        </div>
                    )}
                    <div>
                        <span className="font-semibold">{t('common.active')}: </span>
                        <span>{norm.active ? t('common.yes') : t('common.no')}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
