'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useQualityCategory } from '@/features/manage-quality-categories/model/useQualityCategory'
import { useUpdateQualityCategory } from '@/features/manage-quality-categories/model/useUpdateQualityCategory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function QualityCategoryEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: category, isLoading } = useQualityCategory(id)
    const updateMutation = useUpdateQualityCategory()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        active: true,
    })

    useEffect(() => {
        if (category) {
            setFormData({
                code: category.code || '',
                name: category.name || '',
                description: category.description || '',
                active: category.active ?? true,
            })
        }
    }, [category])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    code: formData.code || undefined,
                    name: formData.name,
                    description: formData.description || undefined,
                    active: formData.active,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/quality-categories')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />
    if (!category) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('qualityCategory.title'), href: '/directories/quality-categories' },
                { label: category.name || '', href: `/directories/quality-categories/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('qualityCategory.edit')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel>{t('qualityCategory.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
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
                            <GovLabel>{t('common.description')}</GovLabel>
                            <GovInput
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder={t('common.description')}
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
                            <GovButton type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? t('common.loading') : t('common.save')}
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
