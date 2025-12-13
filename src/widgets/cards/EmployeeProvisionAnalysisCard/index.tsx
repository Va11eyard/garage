'use client'

import { useEmployeeProvisionAnalysis } from '@/features/view-employee-provision/model/useEmployeeProvisionAnalysis'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Progress } from '@/shared/ui/progress'
import { Spinner } from '@/shared/ui/spinner'

interface EmployeeProvisionAnalysisCardProps {
    employeeId: string
}

export function EmployeeProvisionAnalysisCard({ employeeId }: EmployeeProvisionAnalysisCardProps) {
    const { t } = useTranslation()
    const { data, isLoading } = useEmployeeProvisionAnalysis(employeeId)

    if (isLoading) return <Spinner />
    if (!data) return null

    const employeeName = [data.employeeLastName, data.employeeFirstName, data.employeeMiddleName].filter(Boolean).join(' ')
    const totalItems = data.items?.length || 0
    const providedItems = data.items?.filter(item => (item.issuedQty || 0) >= (item.normQty || 0)).length || 0
    const missingItems = data.items?.filter(item => (item.deficitQty || 0) > 0).length || 0
    const overdueItems = 0 // Not available in current DTO
    const provisionPercentage = totalItems > 0 ? Math.round((providedItems / totalItems) * 100) : 0

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('employeeProvision.provisionAnalysis')}</CardTitle>
                <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>{t('employeeProvision.employee')}:</strong> {employeeName}</p>
                    <p><strong>{t('employeeProvision.category')}:</strong> {data.employeeCategory}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                            {t('employeeProvision.provisionPercentage')}
                        </span>
                        <span className="text-sm font-bold">{provisionPercentage}%</span>
                    </div>
                    <Progress value={provisionPercentage} className="h-2" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{t('employeeProvision.totalItems')}</p>
                        <p className="text-2xl font-bold">{totalItems}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{t('employeeProvision.providedItems')}</p>
                        <p className="text-2xl font-bold text-green-600">{providedItems}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{t('employeeProvision.missingItems')}</p>
                        <p className="text-2xl font-bold text-orange-600">{missingItems}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{t('employeeProvision.overdueItems')}</p>
                        <p className="text-2xl font-bold text-red-600">{overdueItems}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
