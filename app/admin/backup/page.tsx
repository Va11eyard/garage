'use client'

import { useState } from 'react'
import { useExportBackup } from '@/features/manage-backup/model/useExportBackup'
import { useImportBackup } from '@/features/manage-backup/model/useImportBackup'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { toast } from 'sonner'
import { Download, Upload, AlertTriangle } from 'lucide-react'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function BackupPage() {
    const { t } = useTranslation()
    const exportMutation = useExportBackup()
    const importMutation = useImportBackup()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleExport = async () => {
        try {
            await exportMutation.mutateAsync()
            toast.success(t('backup.exportSuccess'))
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    const handleImport = async () => {
        if (!selectedFile) {
            toast.error(t('backup.selectFile'))
            return
        }

        try {
            await importMutation.mutateAsync(selectedFile)
            toast.success(t('backup.importSuccess'))
            setSelectedFile(null)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('backup.title') }
            ]} />
            
            <div>
                <h1 className="text-3xl font-bold">{t('backup.title')}</h1>
                <p className="text-muted-foreground mt-2">
                    {t('backup.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Export Backup */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            {t('backup.export')}
                        </CardTitle>
                        <CardDescription>
                            {t('backup.exportDescription')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={handleExport}
                            disabled={exportMutation.isPending}
                            className="w-full"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {exportMutation.isPending ? t('common.loading') : t('backup.exportButton')}
                        </Button>
                    </CardContent>
                </Card>

                {/* Import Backup */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            {t('backup.import')}
                        </CardTitle>
                        <CardDescription>
                            {t('backup.importDescription')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
                            <p className="text-sm text-yellow-800">{t('backup.warning')}</p>
                        </div>
                        <input
                            type="file"
                            accept=".json"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <Button
                            onClick={handleImport}
                            disabled={importMutation.isPending || !selectedFile}
                            variant="destructive"
                            className="w-full"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {importMutation.isPending ? t('common.loading') : t('backup.importButton')}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
