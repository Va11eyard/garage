'use client'

import { useState } from 'react'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovCard, GovCardHeader, GovCardTitle, GovCardContent } from '@/gov-design/components/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Label } from '@/shared/ui/label'
import { GovButton } from '@/gov-design/components/Button'
import { Package, TrendingDown, AlertTriangle, Archive, Download, Filter } from 'lucide-react'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useWarehousesByOrganization } from '@/features/manage-warehouses/model/useWarehousesByOrganization'

export default function InventoryReportsPage() {
    const { t } = useTranslation()
    const [reportType, setReportType] = useState('stock-levels')
    const [dateRange, setDateRange] = useState('month')
    const [organizationId, setOrganizationId] = useState('')
    const [warehouse, setWarehouse] = useState('__ALL__')
    
    const { data: organizations } = useOrganizations({})
    const { data: warehouses } = useWarehousesByOrganization(organizationId)

    const reportTypes = [
        { value: 'stock-levels', label: t('reports.stockLevels') || 'Уровни запасов' },
        { value: 'low-stock', label: t('reports.lowStock') || 'Низкие остатки' },
        { value: 'expired', label: t('reports.expiredItems') || 'Просроченные товары' },
        { value: 'movements', label: t('reports.movements') || 'Движение товаров' },
    ]

    const dateRanges = [
        { value: 'week', label: t('common.week') || 'Неделя' },
        { value: 'month', label: t('common.month') || 'Месяц' },
        { value: 'quarter', label: t('common.quarter') || 'Квартал' },
        { value: 'year', label: t('common.year') || 'Год' },
    ]



    const handleGenerateReport = () => {
        // Generate report logic here
        console.log('Generating report:', { reportType, dateRange, organizationId, warehouse })
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.reports'), href: '/reports' },
                { label: t('reports.inventory') }
            ]} />

            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">
                    {t('reports.inventory')}
                </h1>
                <p className="text-gov-gray-600">
                    {t('reports.inventoryDescription') || 'Отчеты по запасам и складскому учету'}
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                            <Label>{t('reports.period') || 'Период'}</Label>
                            <Select value={dateRange} onValueChange={setDateRange}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {dateRanges.map(range => (
                                        <SelectItem key={range.value} value={range.value}>
                                            {range.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>{t('reports.organization') || 'Организация'}</Label>
                            <Select value={organizationId || '__ALL__'} onValueChange={(value) => {
                                setOrganizationId(value === '__ALL__' ? '' : value)
                                setWarehouse('__ALL__')
                            }}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('organizations.selectOrganization')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                                    {organizations?.content?.map((org: any) => (
                                        <SelectItem key={org.id} value={org.id}>
                                            {org.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>{t('warehouse.warehouse') || 'Склад'}</Label>
                            <Select value={warehouse} onValueChange={setWarehouse} disabled={!organizationId}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                                    {warehouses?.map((wh: any) => (
                                        <SelectItem key={wh.id} value={wh.id}>
                                            {wh.name}
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
                        <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p>{t('reports.selectParamsToGenerate') || 'Выберите параметры и нажмите "Сформировать отчет" для просмотра'}</p>
                    </div>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
