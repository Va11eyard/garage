'use client'

import { useResponsiblePerson } from '@/features/manage-staff/model/useResponsiblePerson'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import Link from 'next/link'

export function ResponsiblePersonDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: person, isLoading } = useResponsiblePerson(id)

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!person) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{person.fullName || person.personId}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('responsiblePersons.details')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('responsiblePersons.fullName')}: </span>
                        <span>{person.fullName}</span>
                    </div>
                    {person.position && (
                        <div>
                            <span className="font-semibold">{t('responsiblePersons.position')}: </span>
                            <span>{person.position}</span>
                        </div>
                    )}
                    {person.orgUnitName && (
                        <div>
                            <span className="font-semibold">{t('responsiblePersons.orgUnit')}: </span>
                            <span>{person.orgUnitName}</span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
