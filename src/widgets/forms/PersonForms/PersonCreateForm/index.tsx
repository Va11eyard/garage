'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel, GovDatePicker } from '@/gov-design/components/Form'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Service } from '@/shared/api/generated/__swagger_client'

export function PersonCreateForm() {
    const router = useRouter()
    const { t } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const [formData, setFormData] = useState({
        iin: '',
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.iin || !formData.lastName || !formData.firstName) {
            toast.error(t('common.required'))
            return
        }

        setIsSubmitting(true)
        try {
            await Service.create13({
                ...formData,
                middleName: formData.middleName || undefined,
                birthDate: formData.birthDate || undefined,
            })
            toast.success(t('common.success'))
            router.push('/directories/persons')
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
                { label: t('persons.title'), href: '/directories/persons' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('persons.iin')}</GovLabel>
                    <GovInput
                        value={formData.iin}
                        onChange={(e) => setFormData({ ...formData, iin: e.target.value })}
                        required
                        placeholder={t('persons.iin')}
                        maxLength={12}
                    />
                </div>

                <div>
                    <GovLabel required>{t('common.lastName')}</GovLabel>
                    <GovInput
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        placeholder={t('common.lastName')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('common.firstName')}</GovLabel>
                    <GovInput
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        placeholder={t('common.firstName')}
                    />
                </div>

                <div>
                    <GovLabel>{t('common.middleName')}</GovLabel>
                    <GovInput
                        value={formData.middleName}
                        onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                        placeholder={t('common.middleName')}
                    />
                </div>

                <div>
                    <GovLabel>{t('persons.birthDate')}</GovLabel>
                    <GovDatePicker
                        value={formData.birthDate}
                        onChange={(date) => setFormData({ ...formData, birthDate: date })}
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
