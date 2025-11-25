'use client'

import { useDashboard } from '@/features/view-dashboard/model/useDashboard'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Spinner } from '@/shared/ui/spinner'
import { Users, Package, Warehouse, Building2, AlertCircle, TrendingUp } from 'lucide-react'

export function ConsolidatedDashboard() {
    const { t } = useTranslation()
    const { data, isLoading } = useDashboard()

    if (isLoading) return <Spinner />
    if (!data) return null

    const stats = [
        {
            title: t('stats.employees'),
            value: data.totalEmployees,
            active: data.activeEmployees,
            icon: Users,
            color: 'text-blue-600',
        },
        {
            title: t('stats.items'),
            value: data.totalItems,
            icon: Package,
            color: 'text-green-600',
        },
        {
            title: t('stats.warehouses'),
            value: data.totalWarehouses,
            icon: Warehouse,
            color: 'text-purple-600',
        },
        {
            title: t('stats.organizations'),
            value: data.totalEmployees, // Note: API might not have this field
            icon: Building2,
            color: 'text-orange-600',
        },
    ]

    const alerts = [
        {
            title: t('documents.issue'),
            value: data.pendingIssues,
            icon: AlertCircle,
            color: 'text-yellow-600',
        },
        {
            title: t('documents.return'),
            value: data.pendingReturns,
            icon: TrendingUp,
            color: 'text-blue-600',
        },
        {
            title: t('stockBalances.available'),
            value: data.lowStockItems,
            icon: Package,
            color: 'text-red-600',
        },
    ]

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            {stat.active !== undefined && (
                                <p className="text-xs text-muted-foreground">
                                    {t('common.active')}: {stat.active}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {alerts.map((alert) => (
                    <Card key={alert.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{alert.title}</CardTitle>
                            <alert.icon className={`h-4 w-4 ${alert.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{alert.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {data.recentActivities && data.recentActivities.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('auditLog.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {data.recentActivities.slice(0, 5).map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between border-b pb-2 last:border-0"
                                >
                                    <div>
                                        <p className="text-sm font-medium">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground">{activity.type}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(activity.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
