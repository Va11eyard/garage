'use client'

import { useIntegrationEndpoints } from '@/features/manage-integration-endpoints/model/useIntegrationEndpoints'
import { useTestIntegrationEndpoint } from '@/features/manage-integration-endpoints/model/useTestIntegrationEndpoint'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import { toast } from 'sonner'
import { format } from 'date-fns'
import Link from 'next/link'

export function IntegrationEndpointsTable() {
    const { t } = useTranslation()
    const { data, isLoading } = useIntegrationEndpoints()
    const testMutation = useTestIntegrationEndpoint()

    const handleTest = (code: string) => {
        testMutation.mutate(code, {
            onSuccess: () => toast.success(t('common.success')),
            onError: () => toast.error(t('common.error')),
        })
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
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
                        <TableHead>{t('integrationEndpoints.status')}</TableHead>
                        <TableHead>{t('integrationEndpoints.lastTest')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((endpoint) => (
                        <TableRow key={endpoint.id}>
                            <TableCell className="font-mono">{endpoint.code}</TableCell>
                            <TableCell>{endpoint.name}</TableCell>
                            <TableCell>
                                {t(`integrationEndpoints.systems.${endpoint.system.toLowerCase().replace('_', '')}`)}
                            </TableCell>
                            <TableCell className="font-mono text-xs">{endpoint.baseUrl || '—'}</TableCell>
                            <TableCell>
                                <Badge variant={endpoint.active ? 'default' : 'secondary'}>
                                    {endpoint.active ? t('common.active') : t('common.inactive')}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {endpoint.lastTestDate
                                    ? format(new Date(endpoint.lastTestDate), 'dd.MM.yyyy HH:mm')
                                    : '—'}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleTest(endpoint.code)}
                                    disabled={testMutation.isPending}
                                >
                                    {t('integrationEndpoints.testEndpoint')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
