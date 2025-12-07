'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Route } from 'next'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { DatePicker } from '@/shared/ui/date-picker'
import { useCreateItemSupplyNorm } from '@/features/manage-item-supply-norms/model/useCreateItemSupplyNorm'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'
import { EmployeeCategoryService } from '@/features/manage-employee-categories/model/service'
import { ItemService } from '@/features/manage-items/model/service'

export default function ItemSupplyNormCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateItemSupplyNorm()
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.employeeCategoryId || !formData.itemId || !formData.quantity || !formData.wearMonths || !formData.validFrom) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                employeeCategoryId: formData.employeeCategoryId,
                itemId: formData.itemId,
                quantity: Number(formData.quantity),
                wearMonths: Number(formData.wearMonths),
                validFrom: formData.validFrom,
                validTo: formData.validTo || undefined,
                active: formData.active,
            })
            toast.success(t('common.success'))
            router.push('/directories/item-supply-norms' as Route)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('itemSupplyNorm.title'), href: '/directories/item-supply-norms' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('norm.category')}</GovLabel>
                    <Select
                        value={formData.employeeCategoryId}
                        onValueChange={(value) => setFormData({ ...formData, employeeCategoryId: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat: any) => (
                                <SelectItem key={cat.id} value={cat.id!}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel required>{t('norm.item')}</GovLabel>
                    <Select
                        value={formData.itemId}
                        onValueChange={(value) => setFormData({ ...formData, itemId: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            {items.map((item: any) => (
                                <SelectItem key={item.id} value={item.id!}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                </div>

                <div>
                    <GovLabel required>{t('itemSupplyNorm.wearMonths')}</GovLabel>
                    <GovInput
                        type="number"
                        value={formData.wearMonths}
                        onChange={(e) => setFormData({ ...formData, wearMonths: e.target.value })}
                        placeholder={t('itemSupplyNorm.wearMonths')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('itemSupplyNorm.validFrom')}</GovLabel>
                    <DatePicker
                        value={formData.validFrom}
                        onChange={(date: string) => setFormData({ ...formData, validFrom: date })}
                    />
                </div>

                <div>
                    <GovLabel>{t('itemSupplyNorm.validTo')}</GovLabel>
                    <DatePicker
                        value={formData.validTo}
                        onChange={(date: string) => setFormData({ ...formData, validTo: date })}
                    />
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
