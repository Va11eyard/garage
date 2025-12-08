'use client'

import { useSystemJobs } from '@/features/manage-system-jobs/model/useSystemJobs'
import { useRunSystemJob } from '@/features/manage-system-jobs/model/useRunSystemJob'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import { toast } from 'sonner'
import { Play } from 'lucide-react'

export function SystemJobsTable() {
    const { t } = useTranslation()
    const { data, isLoading } = useSystemJobs()
    const runMutation = useRunSystemJob()

    const handleRun = (code: string) => {
        runMutation.mutate(code, {
            onSuccess: () => toast.success(t('systemJobs.runSuccess')),
            onError: () => toast.error(t('common.error')),
        })
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('systemJobs.code')}</TableHead>
                        <TableHead>{t('systemJobs.name')}</TableHead>
                        <TableHead>{t('systemJobs.description')}</TableHead>
                        <TableHead>{t('systemJobs.schedule')}</TableHead>
                        <TableHead>{t('systemJobs.lastRun')}</TableHead>
                        <TableHead>{t('systemJobs.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((job: any) => (
                        <TableRow key={job.code}>
                            <TableCell className="font-mono">{job.code}</TableCell>
                            <TableCell>{job.name}</TableCell>
                            <TableCell className="max-w-md">{job.description || '—'}</TableCell>
                            <TableCell className="font-mono text-sm">{job.schedule || '—'}</TableCell>
                            <TableCell>
                                {job.lastRunAt ? new Date(job.lastRunAt).toLocaleString() : '—'}
                            </TableCell>
                            <TableCell>
                                <Badge variant={job.enabled ? 'default' : 'secondary'}>
                                    {job.enabled ? t('common.enabled') : t('common.disabled')}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRun(job.code)}
                                    disabled={runMutation.isPending || !job.enabled}
                                >
                                    <Play className="w-4 h-4 mr-1" />
                                    {t('systemJobs.run')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
