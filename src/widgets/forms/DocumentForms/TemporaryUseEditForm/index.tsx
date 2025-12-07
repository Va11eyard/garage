'use client'

import { useTemporaryIssue } from '@/features/manage-temporary-issues/model/useTemporaryIssue'
import { useUpdateTemporaryIssue } from '@/features/manage-temporary-issues/model/useUpdateTemporaryIssue'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function TemporaryUseEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: temporaryUse, isLoading } = useTemporaryIssue(id)
    const updateTemporaryUse = useUpdateTemporaryIssue(id)
    const [documentNumber, setDocumentNumber] = useState('')
    const [documentDate, setDocumentDate] = useState('')

    useEffect(() => {
        if (temporaryUse) {
            setDocumentNumber(temporaryUse.documentNumber || '')
            setDocumentDate(temporaryUse.documentDate ? new Date(temporaryUse.documentDate).toISOString().split('T')[0] : '')
        }
    }, [temporaryUse])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateTemporaryUse.mutateAsync({
                documentNumber,
                documentDate,
            })
            toast.success(t('common.success'))
            router.push(`/inventory/temporary-use/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!temporaryUse) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('temporaryUse.edit')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="documentNumber">{t('documents.documentNumber')}</Label>
                            <Input
                                id="documentNumber"
                                value={documentNumber}
                                onChange={(e) => setDocumentNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="documentDate">{t('documents.documentDate')}</Label>
                            <Input
                                id="documentDate"
                                type="date"
                                value={documentDate}
                                onChange={(e) => setDocumentDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={updateTemporaryUse.isPending}>
                                {updateTemporaryUse.isPending ? t('common.saving') : t('common.save')}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                {t('common.cancel')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
