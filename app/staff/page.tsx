'use client'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import Link from 'next/link'
import { Users, Award, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Route } from 'next'

export default function StaffPage() {
    const { t } = useTranslation()
    
    const modules = [
        {
            title: t('staffPage.employeesTitle'),
            description: t('staffPage.employeesDesc'),
            href: '/staff/employees',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            hoverBg: 'group-hover:bg-gov-blue-100',
        },
        {
            title: t('staffPage.responsibleTitle'),
            description: t('staffPage.responsibleDesc'),
            href: '/staff/responsible-persons',
            icon: Award,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            hoverBg: 'group-hover:bg-gov-green-100',
        },
    ]

    return (
        <div className="space-y-6 p-6">
            <GovBreadcrumb items={[
                { label: t('staffPage.breadcrumb') }
            ]} />

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">{t('staffPage.pageTitle')}</h1>
                <p className="text-gov-gray-700">{t('staffPage.pageSubtitle')}</p>
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
