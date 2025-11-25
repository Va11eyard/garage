'use client'

import { useIssue } from '@/features/manage-issues/model/useIssue'
import { useUpdateIssue } from '@/features/manage-issues/model/useUpdateIssue'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function IssueEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: issue, isLoading } = useIssue(id)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const { mutateAsync } = useUpdateIssue(id)
    const { data: warehouses } = useWarehouses({})
    const router = useRouter()

    useEffect(() => {
        if (issue) {
            reset({
                documentNumber: issue.documentNumber,
                documentDate: issue.documentDate,
                warehouseId: issue.warehouseId
            })
        }
    }, [issue, reset])

    const onSubmit = async (data: any) => {
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/inventory/issue/${id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <div className="gov-page-content">{t('common.loading')}</div>

    return (
        <div className="gov-page-content">
            <form onSubmit={handleSubmit(onSubmit)} className="gov-card max-w-2xl space-y-6">
                <h2 className="gov-title">{t('issues.editIssue')}</h2>
                
                <div className="space-y-2">
                    <Label className="gov-label">{t('documents.documentNumber')}</Label>
                    <Input {...register('documentNumber', { required: true })} className="gov-input" />
                    {errors.documentNumber && <span className="text-red-600 text-sm">{t('common.required')}</span>}
                </div>

                <div className="space-y-2">
                    <Label className="gov-label">{t('documents.documentDate')}</Label>
                    <Input type="date" {...register('documentDate', { required: true })} className="gov-input" />
                    {errors.documentDate && <span className="text-red-600 text-sm">{t('common.required')}</span>}
                </div>

                <div className="space-y-2">
                    <Label className="gov-label">{t('documents.warehouse')}</Label>
                    <select {...register('warehouseId', { required: true })} className="gov-input">
                        <option value="">{t('common.select')}</option>
                        {warehouses?.content?.map((wh: any) => (
                            <option key={wh.id} value={wh.id}>
                                {wh.name}
                            </option>
                        ))}
                    </select>
                    {errors.warehouseId && <span className="text-red-600 text-sm">{t('common.required')}</span>}
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting} className="gov-button-primary">
                        {t('common.save')}
                    </Button>
                    <Button type="button" onClick={() => router.back()} className="gov-button-secondary">
                        {t('common.cancel')}
                    </Button>
                </div>
            </form>
        </div>
    )
}
