'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useCreateProvisionNorm } from '@/features/manage-norms/model/useCreateProvisionNorm'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { EmployeeCategoryService } from '@/features/manage-employee-categories/model/service'

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
        employeeCategory: '',
        season: 'ALL' as 'ALL' | 'SUMMER' | 'WINTER' | 'DEMISEASON',
        organizationId: '',
    })

    useState(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const service = new EmployeeCategoryService()
                const data = await service.list()
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
        
        if (!formData.code || !formData.name) {
            toast.error(t('common.required'))
            return
        }

        try {
            await createMutation.mutateAsync({
                code: formData.code,
                name: formData.name,
                description: formData.description || undefined,
                employeeCategory: formData.employeeCategory || undefined,
                season: formData.season,
                organizationId: formData.organizationId || undefined,
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
                            <GovLabel>{t('norm.category')}</GovLabel>
                            <Select
                                value={formData.employeeCategory}
                                onValueChange={(value) => setFormData({ ...formData, employeeCategory: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat: any) => (
                                        <SelectItem key={cat.id} value={cat.id!}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <GovLabel required>Сезон</GovLabel>
                            <Select
                                value={formData.season}
                                onValueChange={(value) => setFormData({ ...formData, season: value as any })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите сезон" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Все сезоны</SelectItem>
                                    <SelectItem value="SUMMER">Лето</SelectItem>
                                    <SelectItem value="WINTER">Зима</SelectItem>
                                    <SelectItem value="DEMISEASON">Демисезон</SelectItem>
                                </SelectContent>
                            </Select>
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
