'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateIntegrationEndpoint } from '@/features/manage-integration-endpoints/model/useCreateIntegrationEndpoint'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function CreateIntegrationEndpointPage() {
    const { t } = useTranslation()
    const router = useRouter()
    const createMutation = useCreateIntegrationEndpoint()

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        system: 'HR_SYSTEM' as 'HR_SYSTEM' | 'ERP' | 'ACCOUNTING' | 'SECURITY_SYSTEM',
        baseUrl: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createMutation.mutateAsync(formData)
            toast.success(t('integrationEndpoints.createSuccess'))
            router.push('/admin/integration-endpoints')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('integrationEndpoints.title'), href: '/admin/integration-endpoints' },
                { label: t('integrationEndpoints.createEndpoint') }
            ]} />

            <Card>
                <CardHeader>
                    <CardTitle>{t('integrationEndpoints.createEndpoint')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">{t('integrationEndpoints.code')} *</Label>
                            <Input
                                id="code"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder="ENDPOINT_CODE"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">{t('integrationEndpoints.name')} *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="system">{t('integrationEndpoints.system')} *</Label>
                            <Select
                                value={formData.system}
                                onValueChange={(value: any) => setFormData({ ...formData, system: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="HR_SYSTEM">{t('integrationEndpoints.systems.hrSystem')}</SelectItem>
                                    <SelectItem value="ERP">{t('integrationEndpoints.systems.erp')}</SelectItem>
                                    <SelectItem value="ACCOUNTING">{t('integrationEndpoints.systems.accounting')}</SelectItem>
                                    <SelectItem value="SECURITY_SYSTEM">{t('integrationEndpoints.systems.securitySystem')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="baseUrl">{t('integrationEndpoints.baseUrl')}</Label>
                            <Input
                                id="baseUrl"
                                type="url"
                                value={formData.baseUrl}
                                onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                                placeholder="https://api.example.com"
                            />
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button type="submit" disabled={createMutation.isPending}>
                                {createMutation.isPending ? t('common.loading') : t('common.create')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                {t('common.cancel')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
