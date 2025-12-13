'use client'

import { useState } from 'react'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovCard, GovCardHeader, GovCardTitle, GovCardContent } from '@/gov-design/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Label } from '@/shared/ui/label'
import { GovButton } from '@/gov-design/components/Button'
import { Calendar, Download, Filter } from 'lucide-react'
import { toast } from 'sonner'

export default function PlanningReportsPage() {
    const { t } = useTranslation()
    const [reportType, setReportType] = useState('purchase-plan')
    const [period, setPeriod] = useState('quarter')
    const [department, setDepartment] = useState('all')

    const reportTypes = [
        { value: 'purchase-plan', label: t('reports.purchasePlan') },
        { value: 'distribution-plan', label: t('reports.distributionPlan') },
        { value: 'budget-analysis', label: t('reports.budgetAnalysis') },
        { value: 'forecasting', label: t('reports.forecasting') },
    ]

    const periods = [
        { value: 'month', label: t('common.month') },
        { value: 'quarter', label: t('common.quarter') },
        { value: 'half-year', label: t('common.halfYear') },
        { value: 'year', label: t('common.year') },
    ]

    const departments = [
        { value: 'all', label: t('common.all') },
        { value: 'it', label: t('department.it') },
        { value: 'hr', label: t('department.hr') },
        { value: 'finance', label: t('department.finance') },
    ]

    const handleGenerateReport = () => {
        toast.info(t('reports.notImplemented'))
        console.log('Generating planning report:', { reportType, period, department })
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.reports'), href: '/reports' },
                { label: t('reports.planning') }
            ]} />

            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">
                    {t('reports.planning')}
                </h1>
                <p className="text-gov-gray-600">
                    {t('reports.planningDescription')}
                </p>
            </div>

            {/* Report Configuration */}
            <GovCard>
                <GovCardHeader>
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gov-blue-600" />
                        <GovCardTitle>{t('reports.configuration')}</GovCardTitle>
                    </div>
                </GovCardHeader>
                <GovCardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>{t('reports.reportType')}</Label>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {reportTypes.map(type => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>{t('reports.period')}</Label>
                            <Select value={period} onValueChange={setPeriod}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {periods.map(p => (
                                        <SelectItem key={p.value} value={p.value}>
                                            {p.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>{t('department.department')}</Label>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(dept => (
                                        <SelectItem key={dept.value} value={dept.value}>
                                            {dept.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <GovButton onClick={handleGenerateReport} className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            {t('reports.generate')}
                        </GovButton>
                    </div>
                </GovCardContent>
            </GovCard>



            {/* Report Preview */}
            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('reports.preview')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <div className="text-center py-12 text-gov-gray-500">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p>{t('reports.selectParamsToGenerate')}</p>
                    </div>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
