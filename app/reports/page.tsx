'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'
import Link from 'next/link'
import { Route } from 'next'
import {
    Users, Package, TrendingUp, Calendar,
    FileText, BarChart3, ShoppingCart, Archive
} from 'lucide-react'

export default function ReportsPage() {
    const { t } = useTranslation()

    const reportCategories = [
        {
            id: 'staff',
            title: t('reports.staff'),
            description: t('reports.staffDescription'),
            icon: Users,
            href: '/reports/staff',
            color: 'blue',
        },
        {
            id: 'inventory',
            title: t('reports.inventory'),
            description: t('reports.inventoryDescription'),
            icon: Package,
            href: '/reports/inventory',
            color: 'green',
        },
        {
            id: 'planning',
            title: t('reports.planning'),
            description: t('reports.planningDescription'),
            icon: Calendar,
            href: '/reports/planning',
            color: 'purple',
        },
        {
            id: 'analytics',
            title: t('reports.analytics'),
            description: t('reports.analyticsDescription'),
            icon: TrendingUp,
            href: '/reports/analytics',
            color: 'orange',
        },
    ]

    const quickReports = [
        {
            title: t('reports.wearReport'),
            description: t('reports.wearReportDescription'),
            icon: Users,
            href: '/reports/staff',
        },
        {
            title: t('reports.stockBalances'),
            description: t('reports.stockBalancesDescription'),
            icon: Archive,
            href: '/inventory/stock-balances',
        },
        {
            title: t('reports.movements'),
            description: t('reports.movementsDescription'),
            icon: FileText,
            href: '/inventory/movements',
        },
        {
            title: t('reports.purchasePlans'),
            description: t('reports.purchasePlansDescription'),
            icon: ShoppingCart,
            href: '/reports/planning',
        },
    ]

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; border: string; icon: string; hover: string }> = {
            blue: {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                icon: 'text-blue-600',
                hover: 'hover:bg-blue-100 hover:border-blue-300',
            },
            green: {
                bg: 'bg-green-50',
                border: 'border-green-200',
                icon: 'text-green-600',
                hover: 'hover:bg-green-100 hover:border-green-300',
            },
            purple: {
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                icon: 'text-purple-600',
                hover: 'hover:bg-purple-100 hover:border-purple-300',
            },
            orange: {
                bg: 'bg-orange-50',
                border: 'border-orange-200',
                icon: 'text-orange-600',
                hover: 'hover:bg-orange-100 hover:border-orange-300',
            },
        }
        return colors[color] || colors.blue
    }

    return (
        <div className="space-y-8">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.reports') }
            ]} />

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">
                    {t('reports.title')}
                </h1>
                <p className="text-gov-gray-600">
                    {t('reports.description')}
                </p>
            </div>

            {/* Main Report Categories */}
            <div>
                <h2 className="text-xl font-semibold text-gov-gray-900 mb-4">
                    {t('common.categories')} / {t('common.categoriesKz')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {reportCategories.map((category) => {
                        const Icon = category.icon
                        const colors = getColorClasses(category.color)
                        return (
                            <Link
                                key={category.id}
                                href={category.href as Route}
                                className={`block p-6 border-2 rounded-lg transition-all duration-200 ${colors.bg} ${colors.border} ${colors.hover}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg bg-white border ${colors.border}`}>
                                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gov-gray-900 mb-1">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-gov-gray-600">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Quick Access Reports */}
            <div>
                <h2 className="text-xl font-semibold text-gov-gray-900 mb-4">
                    {t('common.quickAccess')} / {t('common.quickAccessKz')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickReports.map((report) => {
                        const Icon = report.icon
                        return (
                            <Link
                                key={report.title}
                                href={report.href as Route}
                                className="flex items-center gap-4 p-4 bg-white border-2 border-gov-gray-200 rounded-lg hover:border-gov-blue-300 hover:bg-gov-blue-50 transition-all duration-200"
                            >
                                <div className="p-3 rounded-lg bg-gov-blue-50 border border-gov-blue-200">
                                    <Icon className="w-5 h-5 text-gov-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gov-gray-900">
                                        {report.title}
                                    </h3>
                                    <p className="text-sm text-gov-gray-600">
                                        {report.description}
                                    </p>
                                </div>
                                <BarChart3 className="w-5 h-5 text-gov-gray-400" />
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-gradient-to-r from-gov-blue-50 to-gov-gray-50 border border-gov-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-gov-blue-600 shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold text-gov-gray-900 mb-2">
                            {t('common.aboutReports')} / {t('common.aboutReportsKz')}
                        </h3>
                        <p className="text-sm text-gov-gray-700">
                            {t('common.reportsInfo')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
