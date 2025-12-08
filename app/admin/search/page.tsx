'use client'

import { useState } from 'react'
import { useAdminSearch } from '@/features/manage-admin-search/model/useAdminSearch'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { Spinner } from '@/shared/ui/spinner'
import { Search, FileText, User, Package, Building } from 'lucide-react'
import Link from 'next/link'
import { Route } from 'next'

export default function AdminSearchPage() {
    const { t } = useTranslation()
    const [query, setQuery] = useState('')
    const { data, isLoading } = useAdminSearch(query)

    const getIcon = (type: string) => {
        const icons: Record<string, any> = {
            'EMPLOYEE': User,
            'ITEM': Package,
            'ORGANIZATION': Building,
            'DOCUMENT': FileText,
        }
        return icons[type] || FileText
    }

    const getLink = (result: any): Route => {
        const links: Record<string, string> = {
            'EMPLOYEE': `/staff/employees/${result.id}`,
            'ITEM': `/directories/items/${result.id}`,
            'ORGANIZATION': `/directories/organizations/${result.id}`,
            'WAREHOUSE': `/directories/warehouses/${result.id}`,
            'DOCUMENT': `/inventory/${result.documentType?.toLowerCase()}/${result.id}`,
        }
        return (links[result.type] || '#') as Route
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('adminSearch.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('adminSearch.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('adminSearch.description')}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('adminSearch.searchPlaceholder')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder={t('adminSearch.enterQuery')}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {query.length > 0 && query.length < 3 && (
                        <p className="text-sm text-gray-500">{t('adminSearch.minChars')}</p>
                    )}

                    {isLoading && <Spinner />}

                    {data && data.length === 0 && query.length >= 3 && (
                        <p className="text-center text-gray-500 py-8">{t('adminSearch.noResults')}</p>
                    )}

                    {data && data.length > 0 && (
                        <div className="space-y-2">
                            {data.map((result: any) => {
                                const Icon = getIcon(result.type)
                                return (
                                    <Link
                                        key={`${result.type}-${result.id}`}
                                        href={getLink(result)}
                                        className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <Icon className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{result.title}</h3>
                                                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                                        {t(`adminSearch.types.${result.type.toLowerCase()}`)}
                                                    </span>
                                                </div>
                                                {result.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                                                )}
                                                {result.metadata && (
                                                    <p className="text-xs text-gray-500 mt-1">{result.metadata}</p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
