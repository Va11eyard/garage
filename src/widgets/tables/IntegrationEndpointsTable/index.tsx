'use client'

import { useIntegrationEndpoints } from '@/features/manage-integration-endpoints/model/useIntegrationEndpoints'
import { useTestIntegrationEndpoint } from '@/features/manage-integration-endpoints/model/useTestIntegrationEndpoint'
import { useSendIntegrationEndpoint } from '@/features/manage-integration-endpoints/model/useSendIntegrationEndpoint'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useFilters } from '@/shared/hooks/use-filters'
import { toast } from 'sonner'
import { format } from 'date-fns'
import Link from 'next/link'
import { useMemo } from 'react'
import { IntegrationEndpoint } from '@/shared/api/generated/__swagger_client'

export function IntegrationEndpointsTable() {
    const { t } = useTranslation()
    const { data, isLoading } = useIntegrationEndpoints()
    const testMutation = useTestIntegrationEndpoint()
    const sendMutation = useSendIntegrationEndpoint()
    const { filters, updateFilter } = useFilters({
        system: 'ALL',
        status: 'ALL'
    })

    const filteredData = useMemo(() => {
        if (!data) return []
        return data.filter((endpoint: IntegrationEndpoint) => {
            const matchesSystem = filters.system === 'ALL' || endpoint.externalSystem === filters.system
            const matchesStatus = filters.status === 'ALL' || endpoint.status === filters.status
            return matchesSystem && matchesStatus
        })
    }, [data, filters])

    const handleTest = (code: string) => {
        testMutation.mutate(code, {
            onSuccess: () => toast.success(t('integrationEndpoints.testSuccess')),
            onError: () => toast.error(t('common.error')),
        })
    }

    const handleSend = (code: string) => {
        sendMutation.mutate(code, {
            onSuccess: () => toast.success(t('integrationEndpoints.sendSuccess')),
            onError: () => toast.error(t('common.error')),
        })
    }

    if (isLoading) return <Spinner />

    const getStatusBadge = (status?: string) => {
        if (!status) return 'secondary'
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            ACTIVE: 'default',
            INACTIVE: 'secondary',
            ERROR: 'destructive',
            NOT_CONFIGURED: 'outline'
        }
        return variants[status] || 'secondary'
    }

    const getLastTestDate = (endpoint: IntegrationEndpoint) => {
        const success = endpoint.lastSuccessAt ? new Date(endpoint.lastSuccessAt).getTime() : 0
        const error = endpoint.lastErrorAt ? new Date(endpoint.lastErrorAt).getTime() : 0
        const max = Math.max(success, error)
        return max > 0 ? format(new Date(max), 'dd.MM.yyyy HH:mm') : '—'
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4 flex-wrap">
                <div className="flex gap-4 flex-1 flex-wrap">
                    <div className="min-w-[200px]">
                        <label className="block text-sm font-medium mb-1">{t('integrationEndpoints.system')}</label>
                        <Select value={filters.system} onValueChange={(value) => updateFilter('system', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">{t('common.all')}</SelectItem>
                                <SelectItem value="HR_SYSTEM">{t('integrationEndpoints.systems.hrSystem')}</SelectItem>
                                <SelectItem value="ERP">{t('integrationEndpoints.systems.erp')}</SelectItem>
                                <SelectItem value="ACCOUNTING">{t('integrationEndpoints.systems.accounting')}</SelectItem>
                                <SelectItem value="SECURITY_SYSTEM">{t('integrationEndpoints.systems.securitySystem')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="min-w-[150px]">
                        <label className="block text-sm font-medium mb-1">{t('integrationEndpoints.statusLabel')}</label>
                        <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">{t('common.all')}</SelectItem>
                                <SelectItem value="ACTIVE">{t('integrationEndpoints.status.active')}</SelectItem>
                                <SelectItem value="INACTIVE">{t('integrationEndpoints.status.inactive')}</SelectItem>
                                <SelectItem value="ERROR">{t('integrationEndpoints.status.error')}</SelectItem>
                                <SelectItem value="NOT_CONFIGURED">{t('integrationEndpoints.status.notConfigured')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button variant="default" asChild className="text-black">
                    <Link href="/admin/integration-endpoints/create">{t('integrationEndpoints.createEndpoint')}</Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('integrationEndpoints.code')}</TableHead>
                        <TableHead>{t('integrationEndpoints.name')}</TableHead>
                        <TableHead>{t('integrationEndpoints.system')}</TableHead>
                        <TableHead>{t('integrationEndpoints.baseUrl')}</TableHead>
                        <TableHead>{t('integrationEndpoints.statusLabel')}</TableHead>
                        <TableHead>{t('integrationEndpoints.lastTest')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((endpoint: IntegrationEndpoint) => (
                        <TableRow key={endpoint.id}>
                            <TableCell className="font-mono">{endpoint.code}</TableCell>
                            <TableCell>{endpoint.name}</TableCell>
                            <TableCell>
                                {endpoint.externalSystem ? t(`integrationEndpoints.systems.${endpoint.externalSystem.toLowerCase().replace('_', '')}`) : '—'}
                            </TableCell>
                            <TableCell className="font-mono text-xs">{endpoint.baseUrl || '—'}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusBadge(endpoint.status)}>
                                    {endpoint.status ? (() => {
                                        const statusMap: Record<string, string> = {
                                            'ACTIVE': 'status.active',
                                            'INACTIVE': 'status.inactive',
                                            'ERROR': 'status.error',
                                            'NOT_CONFIGURED': 'status.notConfigured'
                                        }
                                        return t(`integrationEndpoints.${statusMap[endpoint.status] || 'status.notConfigured'}`)
                                    })() : '—'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {getLastTestDate(endpoint)}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleTest(endpoint.code!)}
                                        disabled={testMutation.isPending}
                                    >
                                        {t('integrationEndpoints.testEndpoint')}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleSend(endpoint.code!)}
                                        disabled={sendMutation.isPending || endpoint.status !== 'ACTIVE'}
                                    >
                                        {t('integrationEndpoints.sendData')}
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
