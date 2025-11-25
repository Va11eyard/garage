'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useEmployee } from '@/features/manage-employees/model/useEmployee'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'

export default function EmployeeEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: employee, isLoading } = useEmployee(id)

    if (isLoading) return <Spinner />
    if (!employee) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('breadcrumbs.employees'), href: '/staff/employees' },
                { label: employee.personFullName || '', href: `/staff/employees/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('employees.editEmployee')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <div className="text-center py-8">
                        <p className="text-gray-600">
                            {t('employees.editEmployee')} - Feature coming soon
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Use transfer or dismiss actions instead
                        </p>
                    </div>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
