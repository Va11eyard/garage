'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSystemSettings } from '@/features/manage-system-settings/model/useSystemSettings'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'

import { toast } from 'sonner'
import { Route } from 'next'

export function SystemSettingsTable() {
    const { t } = useTranslation()
    const { data, isLoading } = useSystemSettings()
    const { filters, updateFilter } = useFilters({
        search: '',
    })

    const filteredData = useMemo(() => {
        if (!data) return []
        return data.filter((setting: any) => {
            const matchesSearch = !filters.search || 
                setting.key?.toLowerCase().includes(filters.search.toLowerCase()) ||
                setting.value?.toLowerCase().includes(filters.search.toLowerCase()) ||
                setting.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
                setting.groupCode?.toLowerCase().includes(filters.search.toLowerCase())
            return matchesSearch
        })
    }, [data, filters])

    const handleDelete = async (id: string, key: string) => {
        if (!confirm(t('systemSettings.confirmDelete').replace('{key}', key))) {
            return
        }
        
        try {
            // TODO: Implement delete when backend provides the endpoint
            toast.error(t('systemSettings.deleteNotImplemented'))
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4 flex-wrap">
                <div className="flex gap-4 flex-1 flex-wrap">
                    <div className="min-w-[300px]">
                        <label className="block text-sm font-medium mb-1">{t('common.search')}</label>
                        <Input
                            placeholder={t('systemSettings.searchPlaceholder')}
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                        />
                    </div>
                </div>
                <Button variant="default" asChild className="text-black">
                    <a href="/admin/system-settings/create">{t('systemSettings.createSetting')}</a>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('systemSettings.key')}</TableHead>
                        <TableHead>{t('systemSettings.value')}</TableHead>
                        <TableHead>{t('systemSettings.description')}</TableHead>
                        <TableHead>{t('systemSettings.groupCode')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((setting: any) => (
                        <TableRow key={setting.id}>
                            <TableCell className="font-mono text-sm font-medium">{setting.key}</TableCell>
                            <TableCell className="max-w-xs truncate">{setting.value}</TableCell>
                            <TableCell className="max-w-md">{setting.description || '—'}</TableCell>
                            <TableCell>{setting.groupCode || '—'}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/admin/system-settings/${setting.id}` as Route}>
                                            {t('common.view')}
                                        </Link>
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleDelete(setting.id, setting.key)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        {t('common.delete')}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
