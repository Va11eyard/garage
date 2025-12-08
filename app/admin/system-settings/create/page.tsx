'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUpsertSystemSetting } from '@/features/manage-system-settings/model/useUpsertSystemSetting'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

import { GovBreadcrumb } from '@/gov-design/patterns'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function CreateSystemSettingPage() {
    const { t } = useTranslation()
    const router = useRouter()
    const upsertMutation = useUpsertSystemSetting()

    const [formData, setFormData] = useState({
        key: '',
        value: '',
        description: '',
        groupCode: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await upsertMutation.mutateAsync(formData)
            toast.success(t('systemSettings.createSuccess'))
            router.push('/admin/system-settings')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('systemSettings.title'), href: '/admin/system-settings' },
                { label: t('systemSettings.createSetting') }
            ]} />

            <Card>
                <CardHeader>
                    <CardTitle>{t('systemSettings.createSetting')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="key">{t('systemSettings.key')} *</Label>
                            <Input
                                id="key"
                                value={formData.key}
                                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                placeholder={t('systemSettings.keyPlaceholder')}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="value">{t('systemSettings.value')} *</Label>
                            <Input
                                id="value"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">{t('systemSettings.description')}</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="groupCode">{t('systemSettings.groupCode')}</Label>
                            <Input
                                id="groupCode"
                                value={formData.groupCode}
                                onChange={(e) => setFormData({ ...formData, groupCode: e.target.value })}
                                placeholder="general"
                            />
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button type="submit" disabled={upsertMutation.isPending}>
                                {upsertMutation.isPending ? t('common.loading') : t('common.create')}
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
