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
        lastName: '',
        firstName: '',
        middleName: '',
        nationalId: '',
        gender: '',
        active: true,
    })

    useEffect(() => {
        if (person) {
            setFormData({
                lastName: person.lastName || '',
                firstName: person.firstName || '',
                middleName: person.middleName || '',
                nationalId: person.nationalId || '',
                gender: person.gender || '',
                active: person.active ?? true,
            })
        }
    }, [person])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.lastName || !formData.firstName) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    lastName: formData.lastName,
                    firstName: formData.firstName,
                    middleName: formData.middleName || undefined,
                    nationalId: formData.nationalId || undefined,
                    gender: formData.gender || undefined,
                    active: formData.active,
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

    const fullName = [person.lastName, person.firstName, person.middleName].filter(Boolean).join(' ')

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('persons.title'), href: '/directories/persons' },
                { label: fullName || '', href: `/directories/persons/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('persons.edit')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('persons.lastName')}</GovLabel>
                            <GovInput
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                                placeholder={t('persons.lastName')}
                            />
                        </div>

                        <div>
                            <GovLabel required>{t('persons.firstName')}</GovLabel>
                            <GovInput
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                                placeholder={t('persons.firstName')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('persons.middleName')}</GovLabel>
                            <GovInput
                                value={formData.middleName}
                                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                                placeholder={t('persons.middleName')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('persons.nationalId')}</GovLabel>
                            <GovInput
                                value={formData.nationalId}
                                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                                placeholder={t('persons.nationalId')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('persons.gender')}</GovLabel>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">{t('common.select')}</option>
                                <option value="MALE">{t('persons.male')}</option>
                                <option value="FEMALE">{t('persons.female')}</option>
                            </select>
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
