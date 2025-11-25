'use client'

import { useUnit } from '@/features/manage-units/model/useUnit'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import { Button } from '@/shared/ui/button'

export function UnitDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data, isLoading, error } = useUnit(id)
    if (isLoading) return <Spinner />
    if (error || !data) return <div>{t('common.error')}</div>
    return (
        <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <div>{t('units.code')}: {data.code}</div>
            <div>{t('units.description')}: {data.description}</div>
            <Button variant="default" size="sm">Редактировать</Button>
        </div>
    )
}
