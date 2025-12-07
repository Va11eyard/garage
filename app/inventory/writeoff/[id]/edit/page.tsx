'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useWriteOff } from '@/features/manage-write-offs/model/useWriteOff'
import { useUpdateWriteOff } from '@/features/manage-write-offs/model/useUpdateWriteOff'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function WriteOffEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: writeOff, isLoading } = useWriteOff(id)
    const updateMutation = useUpdateWriteOff(id)
    const { data: warehousesData } = useWarehouses({ page: 0, size: 1000 })
    
    const [organizations, setOrganizations] = useState<any[]>([])
    
    // Fetch organizations
    useEffect(() => {
        import('@/shared/api/generated/__swagger_client').then(({ Service }) => {
            Service.searchOrganizationsPage(undefined, undefined, 0, 1000).then((data) => {
                setOrganizations(data.content || [])
            })
        })
    }, [])
    
    const [formData, setFormData] = useState({
        docNumber: '',
        docDate: '',
        organizationId: '',
        warehouseId: '',
        reason: '',
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (writeOff) {
            setFormData({
                docNumber: writeOff.docNumber || '',
                docDate: writeOff.docDate || '',
                organizationId: writeOff.organizationId || '',
                warehouseId: writeOff.warehouseId || '',
                reason: writeOff.reason || '',
            })
        }
    }, [writeOff])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})
        
        const errors: Record<string, string> = {}
        if (!formData.docNumber) errors.docNumber = t('common.required')
        if (!formData.docDate) errors.docDate = t('common.required')
        if (!formData.organizationId) errors.organizationId = t('common.required')
        if (!formData.warehouseId) errors.warehouseId = t('common.required')
        
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        try {
            await updateMutation.mutateAsync({
                docNumber: formData.docNumber,
                docDate: formData.docDate,
                organizationId: formData.organizationId,
                warehouseId: formData.warehouseId,
                reason: formData.reason || undefined,
                lines: writeOff?.lines || []
            })
            toast.success(t('common.success'))
            router.push(`/inventory/writeoff/${id}`)
        } catch (error: any) {
            if (error?.body?.errors) {
                const apiErrors: Record<string, string> = {}
                const errors = error.body.errors
                if (typeof errors === 'object' && !Array.isArray(errors)) {
                    Object.keys(errors).forEach(field => {
                        const fieldError = errors[field]
                        apiErrors[field] = Array.isArray(fieldError) ? fieldError[0] : fieldError
                    })
                    setFieldErrors(apiErrors)
                }
            }
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!writeOff) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('writeOffs.title'), href: '/inventory/writeoff' },
                { label: writeOff.docNumber || '', href: `/inventory/writeoff/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('writeOffs.editWriteOff')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('documents.documentNumber')}</GovLabel>
                            <GovInput
                                value={formData.docNumber}
                                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                                placeholder={t('documents.documentNumber')}
                            />
                            {fieldErrors.docNumber && <p className="text-sm text-red-600 mt-1">{fieldErrors.docNumber}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('documents.documentDate')}</GovLabel>
                            <GovInput
                                type="date"
                                value={formData.docDate}
                                onChange={(e) => setFormData({ ...formData, docDate: e.target.value })}
                            />
                            {fieldErrors.docDate && <p className="text-sm text-red-600 mt-1">{fieldErrors.docDate}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('organizations.organization')}</GovLabel>
                            <Select
                                value={formData.organizationId || undefined}
                                onValueChange={(value) => setFormData({ ...formData, organizationId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {organizations?.map((org: any) => (
                                        <SelectItem key={org.id} value={org.id!}>
                                            {org.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldErrors.organizationId && <p className="text-sm text-red-600 mt-1">{fieldErrors.organizationId}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('documents.warehouse')}</GovLabel>
                            <Select
                                value={formData.warehouseId || undefined}
                                onValueChange={(value) => setFormData({ ...formData, warehouseId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {warehousesData?.content?.map((wh: any) => (
                                        <SelectItem key={wh.id} value={wh.id!}>
                                            {wh.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldErrors.warehouseId && <p className="text-sm text-red-600 mt-1">{fieldErrors.warehouseId}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('documents.reason')}</GovLabel>
                            <GovInput
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                placeholder={t('documents.reason')}
                            />
                            {fieldErrors.reason && <p className="text-sm text-red-600 mt-1">{fieldErrors.reason}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('common.status')}</GovLabel>
                            <p className="font-medium">
                                <span className={writeOff.status === 'DRAFT' ? 'text-gray-600' : writeOff.status === 'POSTED' ? 'text-green-600' : 'text-red-600'}>
                                    {writeOff.status ? t(`documents.${writeOff.status}`) : t('documents.DRAFT')}
                                </span>
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <GovButton type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? t('common.loading') : t('common.save')}
                            </GovButton>
                            <GovButton 
                                type="button" 
                                variant="secondary"
                                onClick={() => router.back()}
                            >
                                {t('common.cancel')}
                            </GovButton>
                        </div>
                    </form>
                </GovCardContent>
            </GovCard>
        </div>
    )
}
