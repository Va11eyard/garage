'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Route } from 'next'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { DatePicker } from '@/shared/ui/date-picker'
import { useItemSupplyNorm } from '@/features/manage-item-supply-norms/model/useItemSupplyNorm'
import { useUpdateItemSupplyNorm } from '@/features/manage-item-supply-norms/model/useUpdateItemSupplyNorm'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'
import { EmployeeCategoryService } from '@/features/manage-employee-categories/model/service'
import { ItemService } from '@/features/manage-items/model/service'

export default function ItemSupplyNormEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: norm, isLoading: normLoading } = useItemSupplyNorm(id)
    const updateMutation = useUpdateItemSupplyNorm(id)
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [items, setItems] = useState<any[]>([])
    
    const [formData, setFormData] = useState({
        employeeCategoryId: '',
        itemId: '',
        quantity: '',
        wearMonths: '',
        validFrom: '',
        validTo: '',
        active: true,
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const categoryService = new EmployeeCategoryService()
                const itemService = new ItemService()
                const [categoriesData, itemsData] = await Promise.all([
                    categoryService.list(),
                    itemService.list()
                ])
                setCategories(categoriesData)
                setItems(itemsData)
            } catch (error) {
                toast.error('Error loading data')
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (norm) {
            setFormData({
                employeeCategoryId: norm.employeeCategoryId || '',
                itemId: norm.itemId || '',
                quantity: norm.quantity?.toString() || '',
                wearMonths: norm.wearMonths?.toString() || '',
                validFrom: norm.validFrom || '',
                validTo: norm.validTo || '',
                active: norm.active ?? true,
            })
        }
    }, [norm])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})
        
        const errors: Record<string, string> = {}
        if (!formData.quantity) errors.quantity = t('common.required')
        if (!formData.wearMonths) errors.wearMonths = t('common.required')
        if (!formData.validFrom) errors.validFrom = t('common.required')
        
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        try {
            await updateMutation.mutateAsync({
                quantity: Number(formData.quantity),
                wearMonths: Number(formData.wearMonths),
                validFrom: formData.validFrom,
                validTo: formData.validTo || undefined,
                active: formData.active,
            })
            toast.success(t('common.success'))
            router.push('/directories/item-supply-norms' as Route)
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

    if (normLoading || isLoading) return <Spinner />
    if (!norm) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('itemSupplyNorm.title'), href: '/directories/item-supply-norms' },
                { label: norm?.employeeCategoryName || id },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('itemSupplyNorm.edit')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel>{t('norm.category')}</GovLabel>
                            <GovInput
                                value={norm?.employeeCategoryName || ''}
                                disabled
                            />
                            <p className="text-sm text-gray-500 mt-1">{t('itemSupplyNorm.categoryCannotBeChanged')}</p>
                        </div>

                        <div>
                            <GovLabel>{t('norm.item')}</GovLabel>
                            <GovInput
                                value={norm?.itemName || ''}
                                disabled
                            />
                            <p className="text-sm text-gray-500 mt-1">{t('itemSupplyNorm.itemCannotBeChanged')}</p>
                        </div>

                        <div>
                            <GovLabel required>{t('norm.quantity')}</GovLabel>
                            <GovInput
                                type="number"
                                step="0.01"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                placeholder={t('norm.quantity')}
                            />
                            {fieldErrors.quantity && <p className="text-sm text-red-600 mt-1">{fieldErrors.quantity}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('itemSupplyNorm.wearMonths')}</GovLabel>
                            <GovInput
                                type="number"
                                value={formData.wearMonths}
                                onChange={(e) => setFormData({ ...formData, wearMonths: e.target.value })}
                                placeholder={t('itemSupplyNorm.wearMonths')}
                            />
                            {fieldErrors.wearMonths && <p className="text-sm text-red-600 mt-1">{fieldErrors.wearMonths}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('itemSupplyNorm.validFrom')}</GovLabel>
                            <DatePicker
                                value={formData.validFrom}
                                onChange={(date: string) => setFormData({ ...formData, validFrom: date })}
                            />
                            {fieldErrors.validFrom && <p className="text-sm text-red-600 mt-1">{fieldErrors.validFrom}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('itemSupplyNorm.validTo')}</GovLabel>
                            <DatePicker
                                value={formData.validTo}
                                onChange={(date: string) => setFormData({ ...formData, validTo: date })}
                            />
                            {fieldErrors.validTo && <p className="text-sm text-red-600 mt-1">{fieldErrors.validTo}</p>}
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
