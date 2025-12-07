'use client'

import { useWriteOff } from '@/features/manage-write-offs/model/useWriteOff'
import { useUpdateWriteOff } from '@/features/manage-write-offs/model/useUpdateWriteOff'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function WriteOffEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: writeOff, isLoading } = useWriteOff(id)
    const updateWriteOff = useUpdateWriteOff(id)
    const [documentNumber, setDocumentNumber] = useState('')
    const [documentDate, setDocumentDate] = useState('')

    useEffect(() => {
        if (writeOff) {
            setDocumentNumber(writeOff.documentNumber || '')
            setDocumentDate(writeOff.documentDate ? new Date(writeOff.documentDate).toISOString().split('T')[0] : '')
        }
    }, [writeOff])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateWriteOff.mutateAsync({
                documentNumber,
                documentDate,
            })
            toast.success(t('common.success'))
            router.push(`/inventory/writeoff/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!writeOff) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('writeOffs.edit')}</CardTitle>
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
                            <Button type="submit" disabled={updateWriteOff.isPending}>
                                {updateWriteOff.isPending ? t('common.saving') : t('common.save')}
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
