'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { usePerson } from '@/features/manage-persons/model/usePerson'
import { useUpdatePerson } from '@/features/manage-persons/model/useUpdatePerson'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'

export default function PersonEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: person, isLoading } = usePerson(id)
    const updateMutation = useUpdatePerson()
    
    const [formData, setFormData] = useState({
        iin: '',
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
    })

    useEffect(() => {
        if (person) {
            setFormData({
                iin: person.iin || '',
                lastName: person.lastName || '',
                firstName: person.firstName || '',
                middleName: person.middleName || '',
                birthDate: person.birthDate || '',
            })
        }
    }, [person])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.iin || !formData.lastName || !formData.firstName) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    ...formData,
                    middleName: formData.middleName || undefined,
                    birthDate: formData.birthDate || undefined,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/persons')
        } catch (error) {
            toast.error(t('common.error'))
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
                    <GovCardTitle>{t('persons.editPerson')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
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
                            <GovInput
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
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
