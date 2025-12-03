'use client'

import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function EquipmentCreateForm() {
    const { t } = useTranslation()
    const { data: warehouses } = useWarehouses({})
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        type: '',
        warehouseId: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name || !formData.type) {
            toast.error(t('common.required'))
            return
        }

        try {
            // TODO: Implement equipment creation API call
            toast.success(t('common.success'))
            router.push('/admin/equipment')
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('equipment.title'), href: '/admin/equipment' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('equipment.code')}</GovLabel>
                    <GovInput
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        required
                        placeholder={t('equipment.code')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('equipment.name')}</GovLabel>
                    <GovInput
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder={t('equipment.name')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('equipment.type')}</GovLabel>
                    <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SCANNER">Сканер</SelectItem>
                            <SelectItem value="PRINTER">Принтер</SelectItem>
                            <SelectItem value="TERMINAL">Терминал</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel>{t('equipment.warehouse')}</GovLabel>
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
