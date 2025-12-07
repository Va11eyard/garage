'use client'

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

export function CategoryChangeCreateForm() {
    const { t } = useTranslation()
    const { data: warehouses } = useWarehouses({})
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        documentNumber: '',
        documentDate: '',
        warehouseId: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.documentNumber || !formData.documentDate || !formData.warehouseId) {
            toast.error(t('common.required'))
            return
        }

        try {
            // TODO: Implement category change creation API call
            toast.success(t('common.success'))
            router.push('/admin/category-changes')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('categoryChanges.title'), href: '/admin/category-changes' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('categoryChanges.documentNumber')}</GovLabel>
                    <GovInput
                        value={formData.documentNumber}
                        onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                        required
                        placeholder={t('categoryChanges.documentNumber')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('categoryChanges.documentDate')}</GovLabel>
                    <DatePicker
                        value={formData.documentDate}
                        onChange={(date) => setFormData({ ...formData, documentDate: date })}
                    />
                </div>

                <div>
                    <GovLabel required>{t('categoryChanges.warehouse')}</GovLabel>
                    <Select
                        value={formData.warehouseId}
                        onValueChange={(value) => setFormData({ ...formData, warehouseId: value })}
                    >
                        <SelectTrigger className="w-full">
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
