'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { Route } from 'next'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/shared/i18n/use-translation'
import {
    Home, BookOpen, Building2, Building, Warehouse, Package,
    Layers, Ruler, User, BarChart3, FileText,
    Download, Upload, RotateCcw, Trash2, Plus, CheckCircle,
    Clock, Truck, ClipboardList, Users, Award, Settings,
    ScrollText, ChevronLeft, ChevronRight, Link2, BadgeCheck
} from 'lucide-react'

export function Sidebar() {
    const pathname = usePathname()
    const { t } = useTranslation()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [userRoles, setUserRoles] = useState<string[]>([])
    const [username, setUsername] = useState<string>('Пользователь')
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        directories: true,
        inventory: false,
        staff: false,
        admin: true,
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const roles = localStorage.getItem('user_roles')
            if (roles) {
                try {
                    setUserRoles(JSON.parse(roles))
                } catch {
                    setUserRoles([])
                }
            }

            const storedUsername = localStorage.getItem('username')
            if (storedUsername) {
                setUsername(storedUsername)
            }
        }
    }, [])

    const isAdmin = userRoles.includes('ADMIN')

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const menuSections = [
        {
            id: 'main',
            label: t('sidebar.main'),
            icon: Home,
            items: [
                { label: t('nav.dashboard'), href: '/dashboard', icon: BarChart3 },
            ],
        },
        {
            id: 'directories',
            label: t('sidebar.directoriesSection'),
            icon: BookOpen,
            items: [
                { label: t('sidebar.organizations'), href: '/directories/organizations', icon: Building2 },
                { label: t('sidebar.orgUnits'), href: '/directories/org-units', icon: Building },
                { label: t('sidebar.warehouses'), href: '/directories/warehouses', icon: Warehouse },
                { label: t('sidebar.warehouseZones'), href: '/directories/warehouse-zones', icon: Package },
                { label: t('sidebar.warehouseCells'), href: '/directories/warehouse-cells', icon: Layers },
                { label: t('sidebar.items'), href: '/directories/items', icon: ClipboardList },
                { label: t('sidebar.itemGroups'), href: '/directories/item-groups', icon: Layers },
                { label: t('sidebar.units'), href: '/directories/units', icon: Ruler },
                { label: t('sidebar.qualityCategories'), href: '/directories/quality-categories', icon: BadgeCheck  },
                { label: t('sidebar.employeeCategories'), href: '/directories/employee-categories', icon: Users },
                { label: t('sidebar.persons'), href: '/directories/persons', icon: User },
                { label: t('sidebar.norms'), href: '/directories/norms', icon: BarChart3 },
            ],
        },
        {
            id: 'inventory',
            label: t('sidebar.documentsSection'),
            icon: FileText,
            items: [
                { label: t('sidebar.receipts'), href: '/inventory/receipts', icon: Download },
                { label: t('sidebar.issue'), href: '/inventory/issue', icon: Upload },
                { label: t('sidebar.return'), href: '/inventory/return', icon: RotateCcw },
                { label: t('sidebar.writeoff'), href: '/inventory/writeoff', icon: Trash2 },
                { label: t('sidebar.surplus'), href: '/inventory/surplus', icon: Plus },
                { label: t('sidebar.qualityAcceptance'), href: '/inventory/quality-acceptance', icon: CheckCircle },
                { label: t('sidebar.temporaryUse'), href: '/inventory/temporary-use', icon: Clock },
                { label: t('sidebar.movements'), href: '/inventory/movements', icon: Truck },
                { label: t('sidebar.inventoryCheck'), href: '/inventory/inventory-check', icon: ClipboardList },
                { label: t('stockBalances.title'), href: '/inventory/stock-balances', icon: Package },
            ],
        },
        {
            id: 'staff',
            label: t('sidebar.staffSection'),
            icon: Users,
            items: [
                { label: t('sidebar.employees'), href: '/staff/employees', icon: User },
            ],
        },
        {
            id: 'reports',
            label: t('nav.reports'),
            icon: BarChart3,
            items: [
                { label: t('reports.staff'), href: '/reports/staff', icon: Users },
                { label: t('reports.inventory'), href: '/reports/inventory', icon: Package },
                { label: t('reports.analytics'), href: '/reports/analytics', icon: BarChart3 },
                { label: t('reports.planning'), href: '/reports/planning', icon: ClipboardList },
            ],
        },
    ]

    const adminSection = {
        id: 'admin',
        label: t('sidebar.adminSection'),
        icon: Settings,
        items: [
            { label: t('sidebar.users'), href: '/admin/users', icon: Users },
            { label: t('sidebar.roles'), href: '/directories/roles', icon: Award },
            { label: t('auditLog.title'), href: '/admin/audit-logs', icon: ScrollText },
            { label: t('systemSettings.title'), href: '/admin/system-settings', icon: Settings },
            { label: t('equipment.title'), href: '/admin/equipment', icon: Package },
            { label: t('integrationEndpoints.title'), href: '/admin/integration-endpoints', icon: Link2 },
            { label: t('categoryChanges.title'), href: '/admin/category-changes', icon: FileText },
        ],
    }

    const allSections = isAdmin ? [...menuSections, adminSection] : menuSections

    return (
        <aside
            className={cn(
                'bg-white border-r border-gov-gray-200 shadow-sm transition-all duration-300 flex flex-col h-full',
                isCollapsed ? 'w-16' : 'w-70'
            )}
        >
            <div className="p-4 border-b border-gov-gray-200 flex items-center justify-between">
                {!isCollapsed && (
                    <span className="font-semibold text-sm text-gov-gray-700">{t('nav.navigation')}</span>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-gov-gray-100 rounded transition-colors text-gov-gray-600 hover:text-gov-blue-600 border border-transparent hover:border-gov-blue-200"
                    title={isCollapsed ? t('nav.expand') : t('nav.collapse')}
                    aria-label={isCollapsed ? t('nav.expandMenu') : t('nav.collapseMenu')}
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                {allSections.map((section) => {
                    const SectionIcon = section.icon
                    return (
                        <div key={section.id} className="mb-2">
                            {section.id === 'main' ? (
                                section.items.map((item) => {
                                    const ItemIcon = item.icon
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href as Route}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200',
                                                pathname === item.href
                                                    ? 'text-black font-normal outline-2 outline-offset-2 outline-black/20'
                                                    : 'text-gray-700'
                                            )}
                                            title={isCollapsed ? item.label : ''}
                                        >
                                            <ItemIcon className={cn(
                                                "w-5 h-5 shrink-0 transition-colors",
                                                pathname === item.href ? 'text-black' : ''
                                            )} />
                                            {!isCollapsed && <span className="text-sm">{item.label}</span>}
                                        </Link>
                                    )
                                })
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gov-gray-100 rounded-md transition-colors text-gov-blue-600"
                                        title={isCollapsed ? section.label : ''}
                                    >
                                        <SectionIcon className="w-5 h-5 shrink-0" />
                                        {!isCollapsed && (
                                            <>
                                                <span className="flex-1 text-left text-sm font-semibold">
                                                    {section.label}
                                                </span>
                                                <ChevronRight className={cn(
                                                    "w-4 h-4 transition-transform",
                                                    expandedSections[section.id] && "rotate-90"
                                                )} />
                                            </>
                                        )}
                                    </button>

                                    {/* Section Items */}
                                    {expandedSections[section.id] && !isCollapsed && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {section.items.map((item) => {
                                                const ItemIcon = item.icon
                                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href as Route}
                                                        className={cn(
                                                            'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-200',
                                                            isActive
                                                                ? 'text-black outline-2 outline-offset-2 outline-black/20 font-normal'
                                                                : 'text-gov-gray-700'
                                                        )}
                                                    >
                                                        <ItemIcon className={cn(
                                                            "w-4 h-4 shrink-0 transition-colors",
                                                            isActive ? 'text-black' : ''
                                                        )} />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )
                })}
            </nav>

            {!isCollapsed && (
                <div className="p-4 border-t border-gov-gray-200 bg-gradient-to-br from-gov-blue-50 to-gov-gray-50">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gov-blue-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-gov-gray-600 font-medium mb-0.5">
                                    {t('common.user')} / {t('common.userKz')}
                                </div>
                                <div className="font-semibold text-sm text-gov-gray-900 truncate" title={username}>
                                    {username}
                                </div>
                            </div>
                        </div>
                        {userRoles.length > 0 && (
                            <div className="flex items-start gap-2 pt-2 border-t border-gov-gray-200">
                                <Award className="w-4 h-4 text-gov-blue-600 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-gov-gray-600 font-medium mb-1">
                                        {t('common.roles')} / {t('common.rolesKz')}
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {userRoles.map((role) => (
                                            <span
                                                key={role}
                                                className="px-2 py-0.5 bg-gov-blue-100 text-gov-blue-700 rounded-full text-[10px] font-medium border border-gov-blue-200"
                                                title={role}
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </aside>
    )
}
