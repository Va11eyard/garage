'use client'

import { useReturn } from '@/features/manage-returns/model/useReturn'
import { useUpdateReturn } from '@/features/manage-returns/model/useUpdateReturn'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function ReturnEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: returnDoc, isLoading } = useReturn(id)
    const updateReturn = useUpdateReturn(id)
    const [documentNumber, setDocumentNumber] = useState('')
    const [documentDate, setDocumentDate] = useState('')

    useEffect(() => {
        if (returnDoc) {
            setDocumentNumber(returnDoc.documentNumber || '')
            setDocumentDate(returnDoc.documentDate ? new Date(returnDoc.documentDate).toISOString().split('T')[0] : '')
        }
    }, [returnDoc])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateReturn.mutateAsync({
                documentNumber,
                documentDate,
            })
            router.push(`/inventory/return/${id}`)
        } catch (error) {
            console.error('Failed to update return:', error)
        }
    }

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!returnDoc) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('returns.edit')}</CardTitle>
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
                            <Button type="submit" disabled={updateReturn.isPending}>
                                {updateReturn.isPending ? t('common.saving') : t('common.save')}
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
