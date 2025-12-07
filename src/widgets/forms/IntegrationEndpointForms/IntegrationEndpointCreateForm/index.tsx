'use client'

import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

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
        } catch (error) {
            toast.error(getErrorMessage(error))
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
                    <Select
                        value={formData.system}
                        onValueChange={(value) => setFormData({ ...formData, system: value })}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hrSystem">{t('integrationEndpoints.systems.hrSystem')}</SelectItem>
                            <SelectItem value="erp">{t('integrationEndpoints.systems.erp')}</SelectItem>
                            <SelectItem value="accounting">{t('integrationEndpoints.systems.accounting')}</SelectItem>
                            <SelectItem value="securitySystem">{t('integrationEndpoints.systems.securitySystem')}</SelectItem>
                        </SelectContent>
                    </Select>
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
