'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Service } from '@/shared/api/generated/__swagger_client'

export function QualityCategoryCreateForm() {
    const router = useRouter()
    const { t } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        setIsSubmitting(true)
        try {
            await Service.create5({
                ...formData,
                description: formData.description || undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/quality-categories')
        } catch (error) {
            toast.error(t('common.error'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('qualityCategory.title'), href: '/directories/quality-categories' },
                { label: t('common.create') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('qualityCategory.createCategory')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('qualityCategory.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                                placeholder={t('qualityCategory.code')}
                            />
                        </div>

                        <div>
                            <GovLabel required>{t('qualityCategory.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder={t('qualityCategory.name')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('qualityCategory.description')}</GovLabel>
                            <GovTextarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder={t('qualityCategory.description')}
                                rows={3}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <GovButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? t('common.loading') : t('common.create')}
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
