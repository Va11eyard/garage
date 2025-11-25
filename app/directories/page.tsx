'use client'

import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovBreadcrumb } from '@/gov-design/patterns'
import Link from 'next/link'
import { Route } from "next"
import { Building2, Building, Warehouse, Package, Layers, Ruler, ClipboardList, FolderTree, Users, Award, FileText, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function DirectoriesPage() {
    const { t } = useTranslation()
    
    const directories = [
        { title: t('organizations.title'), description: t('directories.organizationsDesc'), href: '/directories/organizations', icon: Building2, color: 'text-blue-600', bgColor: 'bg-blue-50', hoverBg: 'group-hover:bg-blue-100' },
        { title: t('orgUnits.title'), description: t('directories.orgUnitsDesc'), href: '/directories/org-units', icon: Building, color: 'text-green-600', bgColor: 'bg-green-50', hoverBg: 'group-hover:bg-green-100' },
        { title: t('warehouses.title'), description: t('directories.warehousesDesc'), href: '/directories/warehouses', icon: Warehouse, color: 'text-purple-600', bgColor: 'bg-purple-50', hoverBg: 'group-hover:bg-purple-100' },
        { title: t('warehouseZones.title'), description: t('directories.warehouseZonesDesc'), href: '/directories/warehouse-zones', icon: Package, color: 'text-orange-600', bgColor: 'bg-orange-50', hoverBg: 'group-hover:bg-orange-100' },
        { title: t('warehouseCells.title'), description: t('directories.warehouseCellsDesc'), href: '/directories/warehouse-cells', icon: Layers, color: 'text-cyan-600', bgColor: 'bg-cyan-50', hoverBg: 'group-hover:bg-cyan-100' },
        { title: t('unitOfMeasure.title'), description: t('directories.unitsDesc'), href: '/directories/units', icon: Ruler, color: 'text-pink-600', bgColor: 'bg-pink-50', hoverBg: 'group-hover:bg-pink-100' },
        { title: t('items.title'), description: t('directories.itemsDesc'), href: '/directories/items', icon: ClipboardList, color: 'text-indigo-600', bgColor: 'bg-indigo-50', hoverBg: 'group-hover:bg-indigo-100' },
        { title: t('itemGroup.title'), description: t('directories.itemGroupsDesc'), href: '/directories/item-groups', icon: FolderTree, color: 'text-teal-600', bgColor: 'bg-teal-50', hoverBg: 'group-hover:bg-teal-100' },
        { title: t('persons.title'), description: t('directories.personsDesc'), href: '/directories/persons', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50', hoverBg: 'group-hover:bg-blue-100' },
        { title: t('employeeCategories.title'), description: t('directories.employeeCategoriesDesc'), href: '/directories/employee-categories', icon: Award, color: 'text-green-600', bgColor: 'bg-green-50', hoverBg: 'group-hover:bg-green-100' },
        { title: t('norm.title'), description: t('directories.normsDesc'), href: '/directories/norms', icon: FileText, color: 'text-orange-600', bgColor: 'bg-orange-50', hoverBg: 'group-hover:bg-orange-100' },
    ]

    return (
        <div className="space-y-6 p-6">
            <GovBreadcrumb items={[{ label: t('directories.breadcrumb') }]} />
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('directories.pageTitle')}</h1>
                <p className="text-gray-700">{t('directories.pageSubtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {directories.map((dir) => {
                    const Icon = dir.icon
                    return (
                        <Link key={dir.href} href={dir.href as Route}>
                            <GovCard className="h-full hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-2">
                                <GovCardHeader className="pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-xl ${dir.bgColor} ${dir.hoverBg} group-hover:scale-110 transition-all duration-300 shadow-md`}>
                                            <Icon className={`w-7 h-7 ${dir.color}`} />
                                        </div>
                                        <GovCardTitle className="text-lg">{dir.title}</GovCardTitle>
                                    </div>
                                </GovCardHeader>
                                <GovCardContent>
                                    <p className="text-sm text-gov-gray-600 mb-3">{dir.description}</p>
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
