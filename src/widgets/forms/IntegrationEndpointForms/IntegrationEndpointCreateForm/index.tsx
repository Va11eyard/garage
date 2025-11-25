'use client'

import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect } from '@/gov-design/components/Form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function IntegrationEndpointCreateForm() {
    const { t } = useTranslation()
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        system: '',
        baseUrl: '',
        active: true,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name || !formData.system) {
            toast.error(t('common.required'))
            return
        }

        try {
            // TODO: Implement integration endpoint creation API call
            toast.success(t('common.success'))
            router.push('/admin/integration-endpoints')
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('integrationEndpoints.title'), href: '/admin/integration-endpoints' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('integrationEndpoints.code')}</GovLabel>
                    <GovInput
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        required
                        placeholder={t('integrationEndpoints.code')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('integrationEndpoints.name')}</GovLabel>
                    <GovInput
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder={t('integrationEndpoints.name')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('integrationEndpoints.system')}</GovLabel>
                    <GovSelect
                        value={formData.system}
                        onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                        required
                    >
                        <option value="">{t('common.select')}</option>
                        <option value="ERP">ERP</option>
                        <option value="WMS">WMS</option>
                        <option value="EXTERNAL_API">External API</option>
                    </GovSelect>
                </div>

                <div>
                    <GovLabel>{t('integrationEndpoints.baseUrl')}</GovLabel>
                    <GovInput
                        value={formData.baseUrl}
                        onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                        placeholder="https://api.example.com"
                    />
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
