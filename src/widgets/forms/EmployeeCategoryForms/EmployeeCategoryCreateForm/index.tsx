'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { useCreateEmployeeCategory } from '@/features/manage-employee-categories/model/useCreateEmployeeCategory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'

export function EmployeeCategoryCreateForm() {
    const router = useRouter()
    const { t } = useTranslation()
    const createMutation = useCreateEmployeeCategory()
    
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

        try {
            await createMutation.mutateAsync({
                ...formData,
                description: formData.description || undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/employee-categories')
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('employeeCategories.title'), href: '/directories/employee-categories' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('employeeCategories.code')}</GovLabel>
                    <GovInput
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        required
                        placeholder={t('employeeCategories.code')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('employeeCategories.name')}</GovLabel>
                    <GovInput
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder={t('employeeCategories.name')}
                    />
                </div>

                <div>
                    <GovLabel>{t('employeeCategories.description')}</GovLabel>
                    <GovTextarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder={t('employeeCategories.description')}
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
