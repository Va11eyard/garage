'use client'

import { useCreateInventory } from '@/features/manage-inventories/model/useCreateInventory'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { DatePicker } from '@/shared/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function InventoryCreateForm() {
    const { t } = useTranslation()
    const { mutateAsync } = useCreateInventory()
    const { data: warehouses } = useWarehouses({})
    const router = useRouter()
    
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
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        toast.error('Создание документа инвентаризации временно недоступно. Документ должен содержать хотя бы одну строку. Эта функция будет доступна после обновления формы создания.')
        return
        
        // Commented out until form supports adding lines before submission
        /*
        if (!formData.docNumber?.trim()) {
            toast.error(t('documents.documentNumber') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.docDate) {
            toast.error(t('documents.documentDate') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.organizationId) {
            toast.error(t('organizations.organization') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.warehouseId) {
            toast.error(t('documents.warehouse') + ': ' + t('common.required'))
            return
        }

        try {
            const created = await mutateAsync({
                ...formData,
                docNumber: formData.docNumber.trim(),
                lines: []
            })
            toast.success(t('common.success'))
            router.push(`/inventory/inventory-check/${created.id}` as any)
        } catch (error: any) {
            const errorMessage = error?.body?.message || error?.message || t('common.error')
            toast.error(errorMessage)
        }
        */
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('inventoryCheck.title'), href: '/inventory/inventory-check' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('documents.documentNumber')}</GovLabel>
                    <GovInput
                        value={formData.docNumber}
                        onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                        required
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
                        value={formData.organizationId}
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
                        value={formData.warehouseId}
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
