'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovSelect, GovTextarea } from '@/gov-design/components/Form'
import { useCreateProvisionNorm } from '@/features/manage-norms/model/useCreateProvisionNorm'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Service } from '@/shared/api/generated/__swagger_client'
import { Spinner } from '@/shared/ui/spinner'

export default function NormCreatePage() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateProvisionNorm()
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        categoryId: '',
        validFrom: '',
        validTo: '',
    })

    // Load employee categories
    useState(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const data = await Service.list4()
                setCategories(data)
            } catch (error) {
                toast.error(t('common.error'))
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.code || !formData.name || !formData.categoryId) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                ...formData,
                description: formData.description || undefined,
                validFrom: formData.validFrom || undefined,
                validTo: formData.validTo || undefined,
                lines: [],
            })
            toast.success(t('common.success'))
            router.push('/directories/norms')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('norm.title'), href: '/directories/norms' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                        <div>
                            <GovLabel required>{t('norm.category')}</GovLabel>
                            <GovSelect
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                required
                            >
                                <option value="">{t('common.select')}</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id!}>
                                        {cat.name}
                                    </option>
                                ))}
                            </GovSelect>
                        </div>

                        <div>
                            <GovLabel required>Код</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                required
                                placeholder="Код"
                            />
                        </div>

                        <div>
                            <GovLabel required>Наименование</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="Наименование"
                            />
                        </div>

                        <div>
                            <GovLabel>Описание</GovLabel>
                            <GovTextarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Описание"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <GovLabel>Действует с</GovLabel>
                                <GovInput
                                    type="date"
                                    value={formData.validFrom}
                                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                />
                            </div>
                            <div>
                                <GovLabel>Действует по</GovLabel>
                                <GovInput
                                    type="date"
                                    value={formData.validTo}
                                    onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                                />
                            </div>
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
        </div>
    )
}
