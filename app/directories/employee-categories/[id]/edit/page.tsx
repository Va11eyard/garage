'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovTextarea } from '@/gov-design/components/Form'
import { useEmployeeCategory } from '@/features/manage-employee-categories/model/useEmployeeCategory'
import { useUpdateEmployeeCategory } from '@/features/manage-employee-categories/model/useUpdateEmployeeCategory'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function EmployeeCategoryEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: category, isLoading } = useEmployeeCategory(id)
    const updateMutation = useUpdateEmployeeCategory()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        description: '',
        active: true,
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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
        setFieldErrors({})
        
        const errors: Record<string, string> = {}
        if (!formData.code) errors.code = t('common.required')
        if (!formData.name) errors.name = t('common.required')
        
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    code: formData.code,
                    name: formData.name,
                    description: formData.description || undefined,
                    active: formData.active,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/employee-categories')
        } catch (error: any) {
            if (error?.body?.errors) {
                const apiErrors: Record<string, string> = {}
                const errors = error.body.errors
                if (typeof errors === 'object' && !Array.isArray(errors)) {
                    Object.keys(errors).forEach(field => {
                        const fieldError = errors[field]
                        apiErrors[field] = Array.isArray(fieldError) ? fieldError[0] : fieldError
                    })
                    setFieldErrors(apiErrors)
                }
            }
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!category) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('employeeCategories.title'), href: '/directories/employee-categories' },
                { label: category.name || '', href: `/directories/employee-categories/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('employeeCategories.editCategory')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('employeeCategories.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder={t('employeeCategories.code')}
                            />
                            {fieldErrors.code && <p className="text-sm text-red-600 mt-1">{fieldErrors.code}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('employeeCategories.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t('employeeCategories.name')}
                            />
                            {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('employeeCategories.description')}</GovLabel>
                            <GovTextarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder={t('employeeCategories.description')}
                                rows={3}
                            />
                            {fieldErrors.description && <p className="text-sm text-red-600 mt-1">{fieldErrors.description}</p>}
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
