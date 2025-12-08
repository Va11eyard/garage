'use client'

import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import Link from 'next/link'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Route } from "next";
import { useEmployeesCount } from '@/features/manage-staff/model/useEmployeesCount'
import { useItemsCount } from '@/features/manage-items/model/useItemsCount'
import { useWarehousesCount } from '@/features/manage-warehouses/model/useWarehousesCount'
import { useOrganizationsCount } from '@/features/manage-organizations/model/useOrganizationsCount'
import { Spinner } from '@/shared/ui/spinner'
import { BookOpen, Users, Package, Wrench, FileText, Warehouse, Box, Building } from 'lucide-react'

export function DashboardMain() {
    const { t } = useTranslation()

    const { data: employeesCount, isLoading: isLoadingEmployees } = useEmployeesCount()
    const { data: itemsCount, isLoading: isLoadingItems } = useItemsCount()
    const { data: warehousesCount, isLoading: isLoadingWarehouses } = useWarehousesCount()
    const { data: organizationsCount, isLoading: isLoadingOrganizations } = useOrganizationsCount()

    const modules = [
        { tKey: 'directories', href: '/directories', icon: BookOpen, color: 'text-gov-blue-500', bgColor: 'bg-gov-blue-50' },
        { tKey: 'staff', href: '/staff', icon: Users, color: 'text-gov-green-500', bgColor: 'bg-gov-green-50' },
        { tKey: 'inventory', href: '/inventory', icon: Package, color: 'text-purple-500', bgColor: 'bg-purple-50' },
        { tKey: 'equipment', href: '/equipment', icon: Wrench, color: 'text-gov-orange-400', bgColor: 'bg-orange-50' },
        { tKey: 'reports', href: '/reports', icon: FileText, color: 'text-gov-red-500', bgColor: 'bg-red-50' },
    ]

    const stats = [
        { 
            tKey: 'employees', 
            value: employeesCount, 
            isLoading: isLoadingEmployees, 
            color: 'text-gov-blue-500',
            bgColor: 'bg-gov-blue-50',
            icon: Users
        },
        { 
            tKey: 'items', 
            value: itemsCount, 
            isLoading: isLoadingItems, 
            color: 'text-gov-green-500',
            bgColor: 'bg-gov-green-50',
            icon: Box
        },
        { 
            tKey: 'warehouses', 
            value: warehousesCount, 
            isLoading: isLoadingWarehouses, 
            color: 'text-gov-orange-400',
            bgColor: 'bg-orange-50',
            icon: Warehouse
        },
        { 
            tKey: 'organizations', 
            value: organizationsCount, 
            isLoading: isLoadingOrganizations, 
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
            icon: Building
        },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">{t('dashboard.title')}</h1>
                <p className="text-gov-gray-600">{t('dashboard.subtitle')}</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <GovCard key={stat.tKey} className="hover:shadow-md transition-shadow">
                            <GovCardContent className="pt-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                                            {stat.isLoading ? <Spinner /> : (stat.value ?? 0)}
                                        </div>
                                        <div className="text-sm text-gov-gray-600 font-medium">
                                            {t('dashboard.stats.' + stat.tKey)}
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </GovCardContent>
                        </GovCard>
                    )
                })}
            </div>

            {/* Modules */}
            <div>
                <h2 className="text-xl font-semibold text-gov-gray-900 mb-4">Модули системы</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => {
                        const Icon = module.icon
                        return (
                            <Link key={module.tKey} href={module.href as Route}>
                                <GovCard className="hover:shadow-xl hover:border-gov-blue-300 transition-all cursor-pointer h-full">
                                    <GovCardHeader gradient={false}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg ${module.bgColor}`}>
                                                <Icon className={`w-6 h-6 ${module.color}`} />
                                            </div>
                                            <GovCardTitle className="text-gov-gray-900">
                                                {t('dashboard.modules.' + module.tKey)}
                                            </GovCardTitle>
                                        </div>
                                    </GovCardHeader>
                                    <GovCardContent>
                                        <p className="text-sm text-gov-gray-600">{t('dashboard.modules.go')}</p>
                                    </GovCardContent>
                                </GovCard>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
