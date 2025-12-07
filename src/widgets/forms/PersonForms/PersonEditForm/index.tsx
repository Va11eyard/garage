'use client'

import { usePerson } from '@/features/manage-persons/model/usePerson'
import { useUpdatePerson } from '@/features/manage-persons/model/useUpdatePerson'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function PersonEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: person, isLoading } = usePerson(id)
    const updateMutation = useUpdatePerson()
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    })

    useEffect(() => {
        if (person) {
            setFormData({
                fullName: person.fullName || '',
                email: person.email || '',
                phone: person.phone || '',
            })
        }
    }, [person])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.fullName) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    fullName: formData.fullName,
                    email: formData.email || undefined,
                    phone: formData.phone || undefined,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/persons')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!person) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('persons.title'), href: '/directories/persons' },
                { label: person.fullName || '', href: `/directories/persons/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('persons.edit')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('persons.fullName')}</GovLabel>
                            <GovInput
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                                placeholder={t('persons.fullName')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('persons.email')}</GovLabel>
                            <GovInput
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={t('persons.email')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('persons.phone')}</GovLabel>
                            <GovInput
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder={t('persons.phone')}
                            />
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
