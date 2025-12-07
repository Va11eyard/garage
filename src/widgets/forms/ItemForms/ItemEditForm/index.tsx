'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useItem } from '@/features/manage-items/model/useItem'
import { useUpdateItem } from '@/features/manage-items/model/useUpdateItem'
import { useItemGroups } from '@/features/manage-item-groups/model/useItemGroups'
import { useUnits } from '@/features/manage-units/model/useUnits'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function ItemEditForm({ id }: { id: string }) {
    const router = useRouter()
    const { t } = useTranslation()
    const { data: item, isLoading } = useItem(id)
    const { data: itemGroupsData } = useItemGroups()
    const { data: unitsData } = useUnits()
    const updateMutation = useUpdateItem()
    
    const itemGroups = itemGroupsData || []
    const units = unitsData || []
    
    const [formData, setFormData] = useState({
        name: '',
        groupId: '',
        baseUnitId: '',
        barcode: '',
        weightKg: '',
        volumeM3: '',
        active: true,
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (item) {
            console.log('Item loaded:', item)
            console.log('baseUnitId:', item.baseUnitId)
            setFormData({
                name: item.name || '',
                groupId: item.groupId || '',
                baseUnitId: item.baseUnitId || '',
                barcode: item.barcode || '',
                weightKg: item.weightKg != null ? String(item.weightKg) : '',
                volumeM3: item.volumeM3 != null ? String(item.volumeM3) : '',
                active: item.active ?? true,
            })
        }
    }, [item])
    
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})
        
        const errors: Record<string, string> = {}
        if (!formData.name) {
            errors.name = t('common.required')
        }
        if (!formData.baseUnitId) {
            errors.baseUnitId = t('common.required')
        }
        
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    name: formData.name,
                    groupId: formData.groupId || undefined,
                    baseUnitId: formData.baseUnitId,
                    barcode: formData.barcode || undefined,
                    weightKg: formData.weightKg ? parseFloat(formData.weightKg) : undefined,
                    volumeM3: formData.volumeM3 ? parseFloat(formData.volumeM3) : undefined,
                    active: formData.active,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/items')
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
    if (!item) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('items.title'), href: '/directories/items' },
                { label: item.name || '', href: `/directories/items/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('items.editItem')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel>{t('items.code')}</GovLabel>
                            <GovInput
                                value={item.code}
                                disabled
                                className="bg-gray-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">{t('items.code')} нельзя изменить</p>
                            {fieldErrors.code && <p className="text-sm text-red-600 mt-1">{fieldErrors.code}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('items.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t('items.name')}
                            />
                            {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('items.itemGroup')}</GovLabel>
                            <Select 
                                key={`group-${formData.groupId}`}
                                value={formData.groupId || undefined}
                                onValueChange={(value) => setFormData({ ...formData, groupId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('items.itemGroup')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {itemGroups.length > 0 ? itemGroups.map((group: any) => (
                                        <SelectItem key={group.id} value={group.id!}>
                                            {group.name}
                                        </SelectItem>
                                    )) : (
                                        <div className="p-2 text-sm text-gray-500">Loading...</div>
                                    )}
                                </SelectContent>
                            </Select>
                            {fieldErrors.groupId && <p className="text-sm text-red-600 mt-1">{fieldErrors.groupId}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('items.unitOfMeasure')}</GovLabel>
                            <Select 
                                key={`unit-${formData.baseUnitId}`}
                                value={formData.baseUnitId || undefined}
                                onValueChange={(value) => setFormData({ ...formData, baseUnitId: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('items.unitOfMeasure')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {units.length > 0 ? units.map((unit: any) => (
                                        <SelectItem key={unit.id} value={unit.id!}>
                                            {unit.name}
                                        </SelectItem>
                                    )) : (
                                        <div className="p-2 text-sm text-gray-500">Loading...</div>
                                    )}
                                </SelectContent>
                            </Select>
                            {fieldErrors.baseUnitId && <p className="text-sm text-red-600 mt-1">{fieldErrors.baseUnitId}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('items.barcode')}</GovLabel>
                            <GovInput
                                value={formData.barcode}
                                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                                placeholder={t('items.barcode')}
                            />
                            {fieldErrors.barcode && <p className="text-sm text-red-600 mt-1">{fieldErrors.barcode}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <GovLabel>{t('items.weightKg')}</GovLabel>
                                <GovInput
                                    type="number"
                                    step="0.01"
                                    value={formData.weightKg}
                                    onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                                    placeholder="0.00"
                                />
                                {fieldErrors.weightKg && <p className="text-sm text-red-600 mt-1">{fieldErrors.weightKg}</p>}
                            </div>
                            <div>
                                <GovLabel>{t('items.volumeM3')}</GovLabel>
                                <GovInput
                                    type="number"
                                    step="0.001"
                                    value={formData.volumeM3}
                                    onChange={(e) => setFormData({ ...formData, volumeM3: e.target.value })}
                                    placeholder="0.000"
                                />
                                {fieldErrors.volumeM3 && <p className="text-sm text-red-600 mt-1">{fieldErrors.volumeM3}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="active"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <GovLabel htmlFor="active" className="mb-0">{t('common.active')}</GovLabel>
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
