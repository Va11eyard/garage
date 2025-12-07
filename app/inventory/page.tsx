'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import Link from 'next/link'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { Download, Upload, RotateCcw, Trash2, Truck, ClipboardCheck, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Route } from 'next'

export default function InventoryPage() {
    const { t } = useTranslation()
    
    const modules = [
        {
            title: t('inventoryPage.receiptsTitle'),
            description: t('inventoryPage.receiptsDesc'),
            href: '/inventory/receipts',
            icon: Download,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            hoverBg: 'group-hover:bg-green-100',
        },
        {
            title: t('inventoryPage.issueTitle'),
            description: t('inventoryPage.issueDesc'),
            href: '/inventory/issue',
            icon: Upload,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            hoverBg: 'group-hover:bg-blue-100',
        },
        {
            title: t('inventoryPage.returnTitle'),
            description: t('inventoryPage.returnDesc'),
            href: '/inventory/return',
            icon: RotateCcw,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            hoverBg: 'group-hover:bg-orange-100',
        },
        {
            title: t('inventoryPage.writeoffTitle'),
            description: t('inventoryPage.writeoffDesc'),
            href: '/inventory/writeoff',
            icon: Trash2,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            hoverBg: 'group-hover:bg-red-100',
        },
        {
            title: t('sidebar.surplus'),
            description: t('inventoryPage.surplusDesc'),
            href: '/inventory/surplus',
            icon: Upload,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            hoverBg: 'group-hover:bg-emerald-100',
        },
        {
            title: t('sidebar.qualityAcceptance'),
            description: t('inventoryPage.qualityAcceptanceDesc'),
            href: '/inventory/quality-acceptance',
            icon: ClipboardCheck,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            hoverBg: 'group-hover:bg-indigo-100',
        },
        {
            title: t('sidebar.temporaryUse'),
            description: t('inventoryPage.temporaryUseDesc'),
            href: '/inventory/temporary-use',
            icon: ClipboardCheck,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50',
            hoverBg: 'group-hover:bg-amber-100',
        },
        {
            title: t('inventoryPage.movementsTitle'),
            description: t('inventoryPage.movementsDesc'),
            href: '/inventory/movements',
            icon: Truck,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            hoverBg: 'group-hover:bg-purple-100',
        },
        {
            title: t('inventoryPage.inventoryTitle'),
            description: t('inventoryPage.inventoryDesc'),
            href: '/inventory/inventory-check',
            icon: ClipboardCheck,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50',
            hoverBg: 'group-hover:bg-cyan-100',
        },
        {
            title: t('stockBalances.title'),
            description: t('inventoryPage.stockBalancesDesc'),
            href: '/inventory/stock-balances',
            icon: Upload,
            color: 'text-teal-600',
            bgColor: 'bg-teal-50',
            hoverBg: 'group-hover:bg-teal-100',
        },
    ]

    return (
        <div className="space-y-6 p-6">
            <GovBreadcrumb items={[
                { label: t('inventoryPage.breadcrumb') }
            ]} />

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">{t('inventoryPage.pageTitle')}</h1>
                <p className="text-gov-gray-700">{t('inventoryPage.pageSubtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => {
                    const Icon = module.icon
                    return (
                        <Link key={module.href} href={module.href as Route}>
                            <GovCard className="h-full hover:shadow-2xl hover:border-gov-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-2">
                                <GovCardHeader className="pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-xl ${module.bgColor} ${module.hoverBg} group-hover:scale-110 transition-all duration-300 shadow-md`}>
                                            <Icon className={`w-7 h-7 ${module.color}`} />
                                        </div>
                                        <GovCardTitle className="text-lg">{module.title}</GovCardTitle>
                                    </div>
                                </GovCardHeader>
                                <GovCardContent>
                                    <p className="text-sm text-gov-gray-600 mb-3">{module.description}</p>
                                    <div className="flex items-center text-gov-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                                        <span>{t('common.view')}</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </GovCardContent>
                            </GovCard>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
