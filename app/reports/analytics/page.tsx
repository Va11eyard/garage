'use client'

import { useState } from 'react'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovCard, GovCardHeader, GovCardTitle, GovCardContent } from '@/gov-design/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Label } from '@/shared/ui/label'
import { GovButton } from '@/gov-design/components/Button'
import { BarChart3, TrendingUp, PieChart, Activity, Download, Filter } from 'lucide-react'

export default function AnalyticsReportsPage() {
    const { t } = useTranslation()
    const [reportType, setReportType] = useState('usage-trends')
    const [timeframe, setTimeframe] = useState('year')
    const [category, setCategory] = useState('all')

    const reportTypes = [
        { value: 'usage-trends', label: t('reports.usageTrends') || 'Тренды использования' },
        { value: 'cost-analysis', label: t('reports.costAnalysis') || 'Анализ затрат' },
        { value: 'efficiency', label: t('reports.efficiency') || 'Эффективность' },
        { value: 'comparative', label: t('reports.comparative') || 'Сравнительный анализ' },
    ]

    const timeframes = [
        { value: 'quarter', label: t('common.quarter') || 'Квартал' },
        { value: 'half-year', label: t('common.halfYear') || 'Полугодие' },
        { value: 'year', label: t('common.year') || 'Год' },
        { value: 'custom', label: t('common.custom') || 'Настраиваемый' },
    ]

    const categories = [
        { value: 'all', label: t('common.all') || 'Все' },
        { value: 'clothing', label: t('category.clothing') || 'Одежда' },
        { value: 'equipment', label: t('category.equipment') || 'Оборудование' },
        { value: 'supplies', label: t('category.supplies') || 'Расходные материалы' },
    ]

    const handleGenerateReport = () => {
        console.log('Generating analytics report:', { reportType, timeframe, category })
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.reports'), href: '/reports' },
                { label: t('reports.analytics') }
            ]} />

            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">
                    {t('reports.analytics')}
                </h1>
                <p className="text-gov-gray-600">
                    {t('reports.analyticsDescription') || 'Аналитические отчеты и статистика'}
                </p>
            </div>

            {/* Report Configuration */}
            <GovCard>
                <GovCardHeader>
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gov-blue-600" />
                        <GovCardTitle>{t('reports.configuration') || 'Настройка отчета'}</GovCardTitle>
                    </div>
                </GovCardHeader>
                <GovCardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>{t('reports.reportType') || 'Тип отчета'}</Label>
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
                            <Label>{t('reports.timeframe') || 'Временной период'}</Label>
                            <Select value={timeframe} onValueChange={setTimeframe}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeframes.map(tf => (
                                        <SelectItem key={tf.value} value={tf.value}>
                                            {tf.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>{t('category.category') || 'Категория'}</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <GovButton onClick={handleGenerateReport} className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            {t('reports.generate') || 'Сформировать отчет'}
                        </GovButton>
                    </div>
                </GovCardContent>
            </GovCard>



            {/* Report Preview */}
            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('reports.preview') || 'Предпросмотр отчета'}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <div className="text-center py-12 text-gov-gray-500">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p>{t('reports.selectParamsToGenerate') || 'Выберите параметры и нажмите "Сформировать отчет" для просмотра'}</p>
                    </div>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
