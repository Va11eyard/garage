'use client'

import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect, GovDatePicker } from '@/gov-design/components/Form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
        } catch {
            toast.error(t('common.error'))
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
                    <GovDatePicker
                        value={formData.documentDate}
                        onChange={(date) => setFormData({ ...formData, documentDate: date })}
                    />
                </div>

                <div>
                    <GovLabel required>{t('categoryChanges.warehouse')}</GovLabel>
                    <GovSelect
                        value={formData.warehouseId}
                        onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
                        required
                    >
                        <option value="">{t('common.select')}</option>
                        {warehouses?.content?.map((wh: any) => (
                            <option key={wh.id} value={wh.id!}>
                                {wh.name}
                            </option>
                        ))}
                    </GovSelect>
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
