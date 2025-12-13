'use client'

import { useConsolidationDashboard } from '@/features/manage-consolidation/model/useConsolidationDashboard'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { Spinner } from '@/shared/ui/spinner'
import { Building, Package, Users, Warehouse } from 'lucide-react'

export default function ConsolidationDashboardPage() {
    const { t } = useTranslation()
    const { data, isLoading, error } = useConsolidationDashboard()

    if (isLoading) return <Spinner />
    
    if (error) {
        return (
            <div className="container mx-auto py-6 space-y-6">
                <GovBreadcrumb items={[
                    { label: t('nav.dashboard'), href: '/dashboard' },
                    { label: t('consolidation.title') }
                ]} />
                <div className="text-center py-12">
                    <p className="text-red-600">{t('common.error')}</p>
                    <p className="text-sm text-gray-600 mt-2">{t('consolidation.notAvailable')}</p>
                </div>
            </div>
        )
    }

    const stats = [
        {
            label: t('consolidation.totalEmployees'),
            value: data?.totalEmployees ?? 0,
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: t('consolidation.totalWarehouses'),
            value: data?.totalWarehouses ?? 0,
            icon: Warehouse,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            label: t('consolidation.totalItems'),
            value: data?.totalItems ?? 0,
            icon: Package,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            label: t('consolidation.totalStockQuantity'),
            value: data?.totalStockQuantity ?? 0,
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
    ]

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('nav.dashboard'), href: '/dashboard' },
                { label: t('consolidation.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('consolidation.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('consolidation.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.label}>
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                                            {stat.value.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Organization stats not available in current API */}
            {false && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('consolidation.byOrganization')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[].map((org: any) => (
                                <div key={org.organizationId} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">{org.organizationName}</h3>
                                        <p className="text-sm text-gray-600">
                                            {org.employeeCount} {t('consolidation.employees')} • {org.itemCount} {t('consolidation.items')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-600">{org.warehouseCount}</p>
                                        <p className="text-xs text-gray-600">{t('consolidation.warehouses')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
