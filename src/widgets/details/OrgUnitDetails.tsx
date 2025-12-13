'use client'

import { useOrgUnit } from '@/features/manage-org-units/model/useOrgUnit'
import { useOrganization } from '@/features/manage-organizations/model/useOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { Spinner } from '@/shared/ui/spinner'
import Link from 'next/link'

export function OrgUnitDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: orgUnit, isLoading } = useOrgUnit(id)
    const { data: organization } = useOrganization(orgUnit?.organizationId || '')

    if (isLoading) return <Spinner />
    if (!orgUnit) return <div className="p-6">{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('orgUnits.title'), href: '/directories/org-units' },
                { label: orgUnit.name || '' }
            ]} />

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gov-gray-900">{orgUnit.name}</h1>
                <div className="flex gap-2">
                    <Link href="/directories/org-units">
                        <GovButton variant="outline">{t('common.back')}</GovButton>
                    </Link>
                    <Link href={`/directories/org-units/${id}/edit`}>
                        <GovButton>{t('common.edit')}</GovButton>
                    </Link>
                </div>
            </div>

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('orgUnits.title')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <dt className="text-sm font-medium text-gov-gray-500">{t('orgUnits.code')}</dt>
                            <dd className="mt-1 text-sm text-gov-gray-900">{orgUnit.code}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gov-gray-500">{t('orgUnits.name')}</dt>
                            <dd className="mt-1 text-sm text-gov-gray-900">{orgUnit.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gov-gray-500">{t('orgUnits.organization')}</dt>
                            <dd className="mt-1 text-sm text-gov-gray-900">{organization?.name || '-'}</dd>
                        </div>
                        {orgUnit.unitType && (
                            <div>
                                <dt className="text-sm font-medium text-gov-gray-500">{t('orgUnits.type')}</dt>
                                <dd className="mt-1 text-sm text-gov-gray-900">{orgUnit.unitType}</dd>
                            </div>
                        )}
                        <div>
                            <dt className="text-sm font-medium text-gov-gray-500">{t('organizations.status')}</dt>
                            <dd className="mt-1 text-sm">
                                <span className={orgUnit.active ? 'text-green-600' : 'text-red-600'}>
                                    {orgUnit.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
