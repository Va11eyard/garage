'use client'

import { useCreateQualityAcceptance } from '@/features/manage-quality-acceptance/model/useCreateQualityAcceptance'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { DatePicker } from '@/shared/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function QualityAcceptanceCreateForm() {
    const { t } = useTranslation()
    const { mutateAsync } = useCreateQualityAcceptance()
    const { data: warehouses } = useWarehouses({})
    const { data: organizations } = useOrganizations({ page: 0, size: 100 })
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        docNumber: '',
        docDate: '',
        organizationId: '',
        warehouseId: '',
        lines: []
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.docNumber || !formData.docDate || !formData.organizationId || !formData.warehouseId) {
            toast.error(t('common.required'))
            return
        }

        try {
            const created = await mutateAsync(formData)
            toast.success(t('common.success'))
            router.push(`/inventory/quality-acceptance/${created.id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('qualityAcceptances.title'), href: '/inventory/quality-acceptance' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('documents.documentNumber')}</GovLabel>
                    <GovInput
                        value={formData.docNumber}
                        onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                        placeholder={t('documents.documentNumber')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('documents.documentDate')}</GovLabel>
                    <DatePicker
                        value={formData.docDate}
                        onChange={(date) => setFormData({ ...formData, docDate: date })}
                    />
                </div>

                <div>
                    <GovLabel required>{t('organization.title')}</GovLabel>
                    <Select
                        value={formData.organizationId || undefined}
                        onValueChange={(value) => setFormData({ ...formData, organizationId: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {organizations?.content?.map((org: any) => (
                                <SelectItem key={org.id} value={org.id!}>
                                    {org.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                            {warehouses?.content?.map((wh: any) => (
                                <SelectItem key={wh.id} value={wh.id!}>
                                    {wh.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-3 pt-4">
                    <GovButton type="submit">
                        {t('common.create')}
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
        </div>
    )
}
