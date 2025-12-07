'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useCreateItem } from '@/features/manage-items/model/useCreateItem'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { ItemGroupService } from '@/features/manage-item-groups/model/service'
import { UnitOfMeasureService } from '@/features/manage-units/model/service'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function ItemCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateItem()
    const [isLoading, setIsLoading] = useState(false)
    const [itemGroups, setItemGroups] = useState<any[]>([])
    const [units, setUnits] = useState<any[]>([])

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        groupId: '',
        baseUnitId: '',
        barcode: '',
        weightKg: '',
        volumeM3: '',
        active: true,
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    useState(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const itemGroupService = new ItemGroupService()
                const unitService = new UnitOfMeasureService()
                const [groupsData, unitsData] = await Promise.all([
                    itemGroupService.listAll(),
                    unitService.list()
                ])
                setItemGroups(groupsData)
                setUnits(unitsData)
            } catch (error) {
                toast.error(t('common.error'))
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})

        // Client-side validation
        const errors: Record<string, string> = {}
        if (!formData.code) {
            errors.code = t('common.required')
        }
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
            await createMutation.mutateAsync({
                code: formData.code,
                name: formData.name,
                baseUnitId: formData.baseUnitId,
                groupId: formData.groupId || undefined,
                barcode: formData.barcode || undefined,
                weightKg: formData.weightKg ? parseFloat(formData.weightKg) : undefined,
                volumeM3: formData.volumeM3 ? parseFloat(formData.volumeM3) : undefined,
                active: formData.active,
            })
            toast.success(t('common.success'))
            router.push('/directories/items')
        } catch (error: any) {
            // Parse field-specific errors from API
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

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('items.title'), href: '/directories/items' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('items.code')}</GovLabel>
                    <GovInput
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder={t('items.code')}
                    />
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
                        value={formData.groupId}
                        onValueChange={(value) => setFormData({ ...formData, groupId: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {itemGroups.map((group) => (
                                <SelectItem key={group.id} value={group.id!}>
                                    {group.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldErrors.groupId && <p className="text-sm text-red-600 mt-1">{fieldErrors.groupId}</p>}
                </div>

                <div>
                    <GovLabel required>{t('items.unitOfMeasure')}</GovLabel>
                    <Select
                        value={formData.baseUnitId}
                        onValueChange={(value) => setFormData({ ...formData, baseUnitId: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {units.map((unit) => (
                                <SelectItem key={unit.id} value={unit.id!}>
                                    {unit.name}
                                </SelectItem>
                            ))}
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
                    <GovButton type="submit" disabled={createMutation.isPending}>
                        {createMutation.isPending ? t('common.loading') : t('common.create')}
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
