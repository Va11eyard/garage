'use client'

import { useSystemSettings } from '@/features/manage-system-settings/model/useSystemSettings'
import { useUpsertSystemSetting } from '@/features/manage-system-settings/model/useUpsertSystemSetting'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { Badge } from '@/shared/ui/badge'
import { toast } from 'sonner'

export function SystemSettingsTable() {
    const { t } = useTranslation()
    const { data, isLoading } = useSystemSettings()
    const upsertMutation = useUpsertSystemSetting()

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('systemSettings.key')}</TableHead>
                        <TableHead>{t('systemSettings.value')}</TableHead>
                        <TableHead>{t('systemSettings.description')}</TableHead>
                        <TableHead>{t('systemSettings.category')}</TableHead>
                        <TableHead>{t('systemSettings.dataType')}</TableHead>
                        <TableHead>{t('systemSettings.isPublic')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((setting) => (
                        <TableRow key={setting.id}>
                            <TableCell className="font-mono text-sm">{setting.key}</TableCell>
                            <TableCell className="max-w-xs truncate">{setting.value}</TableCell>
                            <TableCell className="max-w-md">{setting.description || '—'}</TableCell>
                            <TableCell>{setting.category || '—'}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{setting.dataType}</Badge>
                            </TableCell>
                            <TableCell>
                                {setting.isPublic ? t('common.yes') : t('common.no')}
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm">
                                    {t('common.edit')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
