'use client'

import Link from 'next/link'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { Route } from 'next'
import { 
    Users, 
    Award, 
    ScrollText, 
    Settings, 
    Package, 
    Link2, 
    FileText,
    ArrowRight
} from 'lucide-react'

export default function AdminPage() {
    const { t } = useTranslation()

    const modules = [
        {
            title: t('users.title'),
            description: t('adminPage.usersDesc'),
            href: '/admin/users',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            hoverBg: 'group-hover:bg-blue-100',
        },
        {
            title: t('roles.title'),
            description: t('adminPage.rolesDesc'),
            href: '/admin/roles',
            icon: Award,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            hoverBg: 'group-hover:bg-green-100',
        },
        {
            title: t('auditLog.title'),
            description: t('adminPage.auditLogDesc'),
            href: '/admin/audit-logs',
            icon: ScrollText,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            hoverBg: 'group-hover:bg-purple-100',
        },
        {
            title: t('systemSettings.title'),
            description: t('adminPage.systemSettingsDesc'),
            href: '/admin/system-settings',
            icon: Settings,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            hoverBg: 'group-hover:bg-orange-100',
        },
        {
            title: t('equipment.title'),
            description: t('adminPage.equipmentDesc'),
            href: '/admin/equipment',
            icon: Package,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50',
            hoverBg: 'group-hover:bg-cyan-100',
        },
        {
            title: t('integrationEndpoints.title'),
            description: t('adminPage.integrationEndpointsDesc'),
            href: '/admin/integration-endpoints',
            icon: Link2,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
            hoverBg: 'group-hover:bg-pink-100',
        },
        {
            title: t('categoryChanges.title'),
            description: t('adminPage.categoryChangesDesc'),
            href: '/admin/category-changes',
            icon: FileText,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            hoverBg: 'group-hover:bg-indigo-100',
        },
    ]

    return (
        <div className="space-y-6 p-6">
            <GovBreadcrumb items={[
                { label: t('adminPage.breadcrumb') }
            ]} />

            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
                <h1 className="text-3xl font-bold text-gov-gray-900 mb-2">{t('adminPage.pageTitle')}</h1>
                <p className="text-gov-gray-700">{t('adminPage.pageSubtitle')}</p>
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
