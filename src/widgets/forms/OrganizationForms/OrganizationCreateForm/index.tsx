'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useCreateOrganization } from '@/features/manage-organizations/model/useCreateOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'

export function OrganizationCreateForm() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateOrganization()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        shortName: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                ...formData,
                shortName: formData.shortName || undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/organizations')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('organizations.title'), href: '/directories/organizations' },
                { label: t('common.create') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('organizations.createOrganization')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('organizations.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                                placeholder={t('organizations.code')}
                            />
                        </div>

                        <div>
                            <GovLabel required>{t('organizations.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder={t('organizations.name')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('organizations.shortName')}</GovLabel>
                            <GovInput
                                value={formData.shortName}
                                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                                placeholder={t('organizations.shortName')}
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
                </GovCardContent>
            </GovCard>
        </div>
    )
}
