'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { usePerson } from '@/features/manage-persons/model/usePerson'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import Link from 'next/link'

export default function PersonViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: person, isLoading } = usePerson(id)

    if (isLoading) return <Spinner />
    if (!person) return <div>{t('common.notFound')}</div>

    const InfoRow = ({ label, value }: { label: string; value?: string | number | null }) => (
        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
            <div className="font-medium text-gray-700">{label}</div>
            <div className="col-span-2 text-gray-900">{value || '-'}</div>
        </div>
    )

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('persons.title'), href: '/directories/persons' },
                { label: `${person.lastName} ${person.firstName}` }
            ]} />

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    {person.lastName} {person.firstName} {person.middleName}
                </h1>
                <div className="flex gap-3">
                    <GovButton variant="outline" onClick={() => router.back()}>
                        {t('common.back')}
                    </GovButton>
                    <Link href={`/directories/persons/${id}/edit`}>
                        <GovButton>
                            {t('common.edit')}
                        </GovButton>
                    </Link>
                </div>
            </div>

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('persons.title')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <div className="space-y-0">
                        <InfoRow label={t('persons.lastName')} value={person.lastName} />
                        <InfoRow label={t('persons.firstName')} value={person.firstName} />
                        <InfoRow label={t('persons.middleName')} value={person.middleName} />
                        <InfoRow label={t('persons.birthDate')} value={person.birthDate} />
                        <InfoRow 
                            label={t('persons.gender')} 
                            value={person.gender === 'MALE' ? t('persons.male') : person.gender === 'FEMALE' ? t('persons.female') : person.gender} 
                        />
                        <InfoRow label={t('persons.nationalId')} value={person.nationalId} />
                        <InfoRow label={t('persons.documentInfo')} value={person.documentInfo} />
                        <InfoRow label={t('persons.heightCm')} value={person.heightCm} />
                        <InfoRow label={t('persons.chestCircumferenceCm')} value={person.chestCircumferenceCm} />
                        <InfoRow label={t('persons.waistCircumferenceCm')} value={person.waistCircumferenceCm} />
                        <InfoRow label={t('persons.shoeSize')} value={person.shoeSize} />
                        <InfoRow label={t('persons.clothingSize')} value={person.clothingSize} />
                        <InfoRow 
                            label={t('common.status')} 
                            value={
                                <span className={person.active ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                    {person.active ? t('common.active') : t('common.inactive')}
                                </span> as any
                            } 
                        />
                    </div>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
