'use client'

import { use } from 'react'
import { useEmployeeAssignment } from '@/features/manage-employee-assignments/model/useEmployeeAssignment'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Spinner } from '@/shared/ui/spinner'
import { format } from 'date-fns'

export default function EmployeeAssignmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const { t } = useTranslation()
    const { data: assignment, isLoading } = useEmployeeAssignment(id)

    if (isLoading) return <Spinner />
    if (!assignment) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('assignments.title'), href: '/staff/assignments' },
                { label: assignment.id || id }
            ]} />

            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">
                    {t('assignments.assignmentDetails')}
                </h1>
            </div>

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('assignments.information')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-600">{t('employees.employee')}</p>
                            <p className="font-medium">{assignment.employeeId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('items.item')}</p>
                            <p className="font-medium">{assignment.itemId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('organizations.organization')}</p>
                            <p className="font-medium">{assignment.organizationId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('warehouses.warehouse')}</p>
                            <p className="font-medium">{assignment.warehouseId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('reports.issueDate')}</p>
                            <p className="font-medium">
                                {assignment.issueDate ? format(new Date(assignment.issueDate), 'dd.MM.yyyy') : '-'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('reports.wearEndDate')}</p>
                            <p className="font-medium">
                                {assignment.wearEndDate ? format(new Date(assignment.wearEndDate), 'dd.MM.yyyy') : '-'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('reports.quantity')}</p>
                            <p className="font-medium">{assignment.quantity}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('reports.category')}</p>
                            <p className="font-medium">{assignment.category || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('assignments.fundingSource')}</p>
                            <p className="font-medium">{assignment.fundingSource || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{t('common.status')}</p>
                            <p className="font-medium">
                                <span className={assignment.active ? 'text-green-600' : 'text-gray-600'}>
                                    {assignment.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </p>
                        </div>
                    </div>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
