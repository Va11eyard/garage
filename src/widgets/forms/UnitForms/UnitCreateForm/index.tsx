'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Service } from '@/shared/api/generated/__swagger_client'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function UnitCreateForm() {
    const router = useRouter()
    const { t } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    
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

        setIsSubmitting(true)
        try {
            await Service.createUnitOfMeasure({
                ...formData,
                shortName: formData.shortName || '',
            })
            toast.success(t('common.success'))
            router.push('/directories/units')
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('unitOfMeasure.title'), href: '/directories/units' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('unitOfMeasure.code')}</GovLabel>
                    <GovInput
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        required
                        placeholder={t('unitOfMeasure.code')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('unitOfMeasure.name')}</GovLabel>
                    <GovInput
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder={t('unitOfMeasure.name')}
                    />
                </div>

                <div>
                    <GovLabel>{t('unitOfMeasure.shortName')}</GovLabel>
                    <GovInput
                        value={formData.shortName}
                        onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                        placeholder={t('unitOfMeasure.shortName')}
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
        </div>
    )
}
