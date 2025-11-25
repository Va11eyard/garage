'use client'

import { useOrganization } from '@/features/manage-organizations/model/useOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import { Button } from '@/shared/ui/button'

export function OrganizationDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data, isLoading, error } = useOrganization(id)

    if (isLoading) return <Spinner />
    if (error || !data) return <div>{t('common.error')}</div>

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <div>{t('organizations.code')}: {data.code}</div>
            <div>{t('organizations.shortName')}: {data.shortName}</div>
            <div>{t('organizations.status')}: {data.active ? t('common.active') : t('common.inactive')}</div>
            <Button variant="default" size="sm">Редактировать</Button>
        </div>
    )
}
