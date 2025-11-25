'use client'

import { useOrgUnit } from '@/features/manage-org-units/model/useOrgUnit'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import Link from 'next/link'

export function OrgUnitDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: orgUnit, isLoading } = useOrgUnit(id)

    if (isLoading) return <div>{t('common.loading')}</div>
    if (!orgUnit) return <div>{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{orgUnit.name}</h1>
                <Link href={`/directories/org-units/${id}/edit`}>
                    <Button>{t('common.edit')}</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('orgUnits.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('orgUnits.code')}: </span>
                        <span>{orgUnit.code}</span>
                    </div>
                    <div>
                        <span className="font-semibold">{t('orgUnits.name')}: </span>
                        <span>{orgUnit.name}</span>
                    </div>
                    {orgUnit.type && (
                        <div>
                            <span className="font-semibold">{t('orgUnits.type')}: </span>
                            <span>{orgUnit.type}</span>
                        </div>
                    )}
                    <div>
                        <span className="font-semibold">{t('common.active')}: </span>
                        <span>{orgUnit.active ? t('common.yes') : t('common.no')}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
