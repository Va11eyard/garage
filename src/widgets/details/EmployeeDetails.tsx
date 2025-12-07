'use client'

import { useEmployee } from '@/features/manage-employees/model/useEmployee'
import { useEmployeeHistory } from '@/features/manage-employees/model/useEmployeeHistory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { Spinner } from '@/shared/ui/spinner'
import Link from 'next/link'
import { Calendar, UserCheck, UserX, ArrowRightLeft } from 'lucide-react'

export function EmployeeDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: employee, isLoading } = useEmployee(id)
    const { data: history, isLoading: historyLoading } = useEmployeeHistory(id)

    if (isLoading) return <Spinner />
    if (!employee) return <div>{t('common.notFound')}</div>

    const getEventIcon = (eventType: string) => {
        switch (eventType) {
            case 'HIRED':
                return <UserCheck className="w-5 h-5 text-green-600" />
            case 'TRANSFERRED':
                return <ArrowRightLeft className="w-5 h-5 text-blue-600" />
            case 'DISMISSED':
                return <UserX className="w-5 h-5 text-red-600" />
            default:
                return <Calendar className="w-5 h-5 text-gray-600" />
        }
    }

    const getEventColor = (eventType: string) => {
        switch (eventType) {
            case 'HIRED':
                return 'border-green-500 bg-green-50'
            case 'TRANSFERRED':
                return 'border-blue-500 bg-blue-50'
            case 'DISMISSED':
                return 'border-red-500 bg-red-50'
            default:
                return 'border-gray-500 bg-gray-50'
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.staff'), href: '/staff' },
                { label: t('employees.title'), href: '/staff/employees' },
                { label: employee.personnelNumber || id }
            ]} />

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    {employee.lastName} {employee.firstName} {employee.middleName}
                </h1>
                <div className="flex gap-2">
                    <GovButton variant="outline" onClick={() => router.push('/staff/employees')}>
                        {t('common.back')}
                    </GovButton>
                    {employee.active && (
                        <>
                            <Link href={`/staff/employees/${id}/edit`}>
                                <GovButton>{t('employees.transferEmployee')}</GovButton>
                            </Link>
                            <Link href={`/staff/employees/${id}/dismiss`}>
                                <GovButton variant="danger">{t('employees.dismissEmployee')}</GovButton>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('common.details')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">{t('staff.personnelNumber')}</p>
                            <p className="font-medium">{employee.personnelNumber || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t('staff.fullName')}</p>
                            <p className="font-medium">
                                {employee.lastName} {employee.firstName} {employee.middleName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t('employees.organization')}</p>
                            <p className="font-medium">{employee.organizationName || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t('employees.orgUnit')}</p>
                            <p className="font-medium">{employee.orgUnitName || '-'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t('employees.position')}</p>
                            <p className="font-medium">{employee.positionName || '-'}</p>
                        </div>
                        {employee.rankName && (
                            <div>
                                <p className="text-sm text-gray-500">{t('staff.rank')}</p>
                                <p className="font-medium">{employee.rankName}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-gray-500">{t('employees.hireDate')}</p>
                            <p className="font-medium">{employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : '-'}</p>
                        </div>
                        {employee.dismissalDate && (
                            <div>
                                <p className="text-sm text-gray-500">{t('employees.dismissDate')}</p>
                                <p className="font-medium">{new Date(employee.dismissalDate).toLocaleDateString()}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-gray-500">{t('employees.status')}</p>
                            <p className="font-medium">
                                <span className={employee.active ? 'text-green-600' : 'text-red-600'}>
                                    {employee.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </p>
                        </div>
                    </div>
                </GovCardContent>
            </GovCard>

            {/* Employee History Timeline */}
            <GovCard>
                <GovCardHeader>
                    <GovCardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        {t('employees.history')}
                    </GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    {historyLoading ? (
                        <div className="text-center py-4">{t('common.loading')}</div>
                    ) : !history || history.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                            {t('employees.noHistory')}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((event: any, index: number) => (
                                <div
                                    key={event.id || index}
                                    className={`flex gap-4 p-4 rounded-lg border-l-4 ${getEventColor(event.eventType)}`}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        {getEventIcon(event.eventType)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-lg">
                                                {event.eventType === 'HIRED' && t('employees.hired')}
                                                {event.eventType === 'TRANSFERRED' && t('employees.transferred')}
                                                {event.eventType === 'DISMISSED' && t('employees.dismissed')}
                                            </h4>
                                            <span className="text-sm text-gray-600">
                                                {new Date(event.eventDate).toLocaleDateString('ru-RU', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        {event.organizationName && (
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium">{t('employees.organization')}:</span> {event.organizationName}
                                            </div>
                                        )}
                                        {event.orgUnitName && (
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium">{t('employees.orgUnit')}:</span> {event.orgUnitName}
                                            </div>
                                        )}
                                        {event.positionName && (
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium">{t('employees.position')}:</span> {event.positionName}
                                            </div>
                                        )}
                                        {event.rankName && (
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium">{t('staff.rank')}:</span> {event.rankName}
                                            </div>
                                        )}
                                        {event.comment && (
                                            <div className="text-sm text-gray-600 mt-2 italic">
                                                {event.comment}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </GovCardContent>
            </GovCard>
        </div>
    )
}
