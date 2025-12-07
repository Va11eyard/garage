'use client'

import { useCreateWriteOff } from '@/features/manage-write-offs/model/useCreateWriteOff'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
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

export function WriteOffCreateForm() {
    const { t } = useTranslation()
    const { mutateAsync } = useCreateWriteOff()
    const { data: warehouses } = useWarehouses({})
    const router = useRouter()
    
    const [organizations, setOrganizations] = useState<any[]>([])
    
    // Fetch organizations
    useState(() => {
        import('@/shared/api/generated/__swagger_client').then(({ Service }) => {
            Service.searchOrganizationsPage(undefined, undefined, 0, 1000).then((data) => {
                setOrganizations(data.content || [])
            })
        })
    })
    
    const [formData, setFormData] = useState({
        docNumber: '',
        docDate: '',
        warehouseId: '',
        organizationId: '',
        reason: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.docNumber || !formData.docDate || !formData.warehouseId || !formData.organizationId) {
            toast.error(t('common.required'))
            return
        }

        try {
            const created = await mutateAsync({
                ...formData,
                lines: []
            })
            toast.success(t('common.success'))
            router.push(`/inventory/writeoff/${created.id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('writeOffs.title'), href: '/inventory/writeoff' },
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

                <div>
                    <GovLabel>{t('documents.reason')}</GovLabel>
                    <GovInput
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder={t('documents.reason')}
                    />
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
