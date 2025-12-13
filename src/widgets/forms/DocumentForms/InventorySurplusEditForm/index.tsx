'use client'

import { useInventorySurplus } from '@/features/manage-inventory-surpluses/model/useInventorySurplus'
import { useUpdateInventorySurplus } from '@/features/manage-inventory-surpluses/model/useUpdateInventorySurplus'
import { useWarehousesByOrganization } from '@/features/manage-warehouses/model/useWarehousesByOrganization'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { DatePicker } from '@/shared/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function InventorySurplusEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: surplus, isLoading } = useInventorySurplus(id)
    const { mutateAsync, isPending } = useUpdateInventorySurplus(id)
    const { data: organizations } = useOrganizations({ page: 0, size: 100 })
    const [selectedOrgId, setSelectedOrgId] = useState<string>()
    const { data: warehouses } = useWarehousesByOrganization(selectedOrgId)
    
    const [formData, setFormData] = useState<{
        docNumber: string
        docDate: string
        organizationId: string
        warehouseId: string
        lines: Array<{
            itemId: string
            unitId: string
            warehouseZoneId?: string
            warehouseCellId?: string
            quantity: number
            comment?: string
        }>
    }>({
        docNumber: '',
        docDate: '',
        organizationId: '',
        warehouseId: '',
        lines: []
    })

    useEffect(() => {
        if (surplus) {
            const validLines = (surplus.lines || []).filter(line => line.itemId && line.unitId && line.quantity).map(line => ({
                itemId: line.itemId!,
                unitId: line.unitId!,
                warehouseZoneId: line.warehouseZoneId,
                warehouseCellId: line.warehouseCellId,
                quantity: line.quantity!,
                comment: line.comment
            }))
            setFormData({
                docNumber: surplus.docNumber || '',
                docDate: surplus.docDate || '',
                organizationId: surplus.organizationId || '',
                warehouseId: surplus.warehouseId || '',
                lines: validLines
            })
            setSelectedOrgId(surplus.organizationId)
        }
    }, [surplus])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.docNumber || !formData.docDate || !formData.organizationId || !formData.warehouseId) {
            toast.error(t('common.required'))
            return
        }

        try {
            await mutateAsync(formData)
            toast.success(t('common.success'))
            router.push(`/inventory/surplus/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!surplus) return <div>{t('common.notFound')}</div>
    
    if (surplus?.status !== 'DRAFT') {
        return (
            <div className="space-y-6">
                <GovBreadcrumb items={[
                    { label: t('breadcrumbs.inventory'), href: '/inventory' },
                    { label: t('inventorySurpluses.title'), href: '/inventory/surplus' },
                    { label: surplus.docNumber || id }
                ]} />
                <GovCard>
                    <GovCardContent className="p-6">
                        <p>Можно редактировать только черновики</p>
                    </GovCardContent>
                </GovCard>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('inventorySurpluses.title'), href: '/inventory/surplus' },
                { label: surplus.docNumber || id, href: `/inventory/surplus/${id}` },
                { label: t('common.edit') }
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
                        onValueChange={(value) => {
                            setFormData({ ...formData, organizationId: value, warehouseId: '' })
                            setSelectedOrgId(value)
                        }}
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
                        disabled={!selectedOrgId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={selectedOrgId ? t('common.select') : t('common.selectOrganizationFirst')} />
                        </SelectTrigger>
                        <SelectContent>
                            {warehouses?.map((wh: any) => (
                                <SelectItem key={wh.id} value={wh.id!}>
                                    {wh.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-3 pt-4">
                    <GovButton type="submit" disabled={isPending}>
                        {isPending ? t('common.loading') : t('common.save')}
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
