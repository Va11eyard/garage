'use client'

import { useCreateMovement } from '@/features/manage-movements/model/useCreateMovement'
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

export function MovementCreateForm() {
    const { t } = useTranslation()
    const { mutateAsync } = useCreateMovement()
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
        movementType: 'INTERNAL' as 'INTERNAL' | 'DP_TO_DP' | 'DP_TO_MVD',
        fromOrganizationId: '',
        fromWarehouseId: '',
        toOrganizationId: '',
        toWarehouseId: '',
        comment: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.docNumber?.trim()) {
            toast.error(t('documents.documentNumber') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.docDate) {
            toast.error(t('documents.documentDate') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.movementType) {
            toast.error(t('movements.movementType') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.fromOrganizationId) {
            toast.error(t('movements.fromOrganization') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.fromWarehouseId) {
            toast.error(t('movements.fromWarehouse') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.toOrganizationId) {
            toast.error(t('movements.toOrganization') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.toWarehouseId) {
            toast.error(t('movements.toWarehouse') + ': ' + t('common.required'))
            return
        }

        toast.error('Создание документа перемещения временно недоступно. Документ должен содержать хотя бы одну строку. Эта функция будет доступна после обновления формы создания.')
        return
        
        // Commented out until form supports adding lines before submission
        /*
        try {
            const created = await mutateAsync({
                ...formData,
                docNumber: formData.docNumber.trim(),
                lines: []
            })
            toast.success(t('common.success'))
            router.push(`/inventory/movements/${created.id}`)
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
                { label: t('movements.title'), href: '/inventory/movements' },
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
                    <GovLabel required>{t('movements.movementType')}</GovLabel>
                    <Select
                        value={formData.movementType}
                        onValueChange={(value: any) => setFormData({ ...formData, movementType: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="INTERNAL">{t('movements.internal')}</SelectItem>
                            <SelectItem value="DP_TO_DP">{t('movements.dpToDp')}</SelectItem>
                            <SelectItem value="DP_TO_MVD">{t('movements.dpToMvd')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel required>{t('movements.fromOrganization')}</GovLabel>
                    <Select
                        value={formData.fromOrganizationId}
                        onValueChange={(value) => setFormData({ ...formData, fromOrganizationId: value })}
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
                    <GovLabel required>{t('movements.fromWarehouse')}</GovLabel>
                    <Select
                        value={formData.fromWarehouseId}
                        onValueChange={(value) => setFormData({ ...formData, fromWarehouseId: value })}
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
                    <GovLabel required>{t('movements.toOrganization')}</GovLabel>
                    <Select
                        value={formData.toOrganizationId}
                        onValueChange={(value) => setFormData({ ...formData, toOrganizationId: value })}
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
                    <GovLabel required>{t('movements.toWarehouse')}</GovLabel>
                    <Select
                        value={formData.toWarehouseId}
                        onValueChange={(value) => setFormData({ ...formData, toWarehouseId: value })}
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
                    <GovLabel>{t('common.comment')}</GovLabel>
                    <GovInput
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        placeholder={t('common.comment')}
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
