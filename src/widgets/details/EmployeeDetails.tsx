'use client'

import { useEmployee } from '@/features/manage-employees/model/useEmployee'
import { useEmployeeHistory } from '@/features/manage-employees/model/useEmployeeHistory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import Link from 'next/link'
import { Calendar, UserCheck, UserX, ArrowRightLeft } from 'lucide-react'

export function EmployeeDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: employee, isLoading } = useEmployee(id)
    const { data: history, isLoading: historyLoading } = useEmployeeHistory(id)

    if (isLoading) return <div>{t('common.loading')}</div>
    if (!employee) return <div>{t('common.noData')}</div>

    const getEventIcon = (status: string) => {
        switch (status) {
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

    const getEventColor = (status: string) => {
        switch (status) {
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
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Сотрудник</h1>
                <div className="flex gap-2">
                    {employee.status === 'ACTIVE' && (
                        <>
                            <Link href={`/staff/employees/${id}/transfer`}>
                                <Button variant="outline">{t('employees.transferEmployee')}</Button>
                            </Link>
                            <Link href={`/staff/employees/${id}/dismiss`}>
                                <Button variant="destructive">{t('employees.dismissEmployee')}</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('employees.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('employees.status')}: </span>
                        <span className={`px-2 py-1 rounded ${
                            employee.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                            employee.status === 'DISMISSED' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {employee.status}
                        </span>
                    </div>
                    {employee.hireDate && (
                        <div>
                            <span className="font-semibold">{t('employees.hireDate')}: </span>
                            <span>{new Date(employee.hireDate).toLocaleDateString()}</span>
                        </div>
                    )}
                    {employee.dismissDate && (
                        <div>
                            <span className="font-semibold">{t('employees.dismissDate')}: </span>
                            <span>{new Date(employee.dismissDate).toLocaleDateString()}</span>
                        </div>
                    )}
                    {employee.position && (
                        <div>
                            <span className="font-semibold">{t('employees.position')}: </span>
                            <span>{employee.position}</span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Employee History Timeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        {t('employees.history') || 'История событий'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {historyLoading ? (
                        <div className="text-center py-4">{t('common.loading')}</div>
                    ) : !history || history.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                            {t('employees.noHistory') || 'Нет истории событий'}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((event: any, index: number) => (
                                <div
                                    key={event.id || index}
                                    className={`flex gap-4 p-4 rounded-lg border-l-4 ${getEventColor(event.status)}`}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        {getEventIcon(event.status)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-lg">
                                                {event.status === 'HIRED' && (t('employees.hired') || 'Принят на работу')}
                                                {event.status === 'TRANSFERRED' && (t('employees.transferred') || 'Переведен')}
                                                {event.status === 'DISMISSED' && (t('employees.dismissed') || 'Уволен')}
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
                                                <span className="font-medium">{t('employees.organization') || 'Организация'}:</span> {event.organizationName}
                                            </div>
                                        )}
                                        {event.orgUnitName && (
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium">{t('employees.orgUnit') || 'Подразделение'}:</span> {event.orgUnitName}
                                            </div>
                                        )}
                                        {event.position && (
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium">{t('employees.position') || 'Должность'}:</span> {event.position}
                                            </div>
                                        )}
                                        {event.rank && (
                                            <div className="text-sm text-gray-700">
                                                <span className="font-medium">{t('employees.rank') || 'Звание'}:</span> {event.rank}
                                            </div>
                                        )}
                                        {event.notes && (
                                            <div className="text-sm text-gray-600 mt-2 italic">
                                                {event.notes}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
