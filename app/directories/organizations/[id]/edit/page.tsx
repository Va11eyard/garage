'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useOrganization } from '@/features/manage-organizations/model/useOrganization'
import { useUpdateOrganization } from '@/features/manage-organizations/model/useUpdateOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function OrganizationEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: organization, isLoading } = useOrganization(id)
    const updateMutation = useUpdateOrganization()
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        shortName: '',
        active: true,
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (organization) {
            setFormData({
                code: organization.code || '',
                name: organization.name || '',
                shortName: organization.shortName || '',
                active: organization.active ?? true,
            })
        }
    }, [organization])

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
                    ...formData,
                    shortName: formData.shortName || undefined,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/organizations')
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
    if (!organization) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('organizations.title'), href: '/directories/organizations' },
                { label: organization.name || '', href: `/directories/organizations/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('organizations.editOrganization')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('organizations.code')}</GovLabel>
                            <GovInput
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder={t('organizations.code')}
                            />
                            {fieldErrors.code && <p className="text-sm text-red-600 mt-1">{fieldErrors.code}</p>}
                        </div>

                        <div>
                            <GovLabel required>{t('organizations.name')}</GovLabel>
                            <GovInput
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t('organizations.name')}
                            />
                            {fieldErrors.name && <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>}
                        </div>

                        <div>
                            <GovLabel>{t('organizations.shortName')}</GovLabel>
                            <GovInput
                                value={formData.shortName}
                                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                                placeholder={t('organizations.shortName')}
                            />
                            {fieldErrors.shortName && <p className="text-sm text-red-600 mt-1">{fieldErrors.shortName}</p>}
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
