'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { DatePicker } from '@/shared/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { usePerson } from '@/features/manage-persons/model/usePerson'
import { useUpdatePerson } from '@/features/manage-persons/model/useUpdatePerson'
import { useTranslation } from '@/shared/i18n/use-translation'
import { toast } from 'sonner'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export default function PersonEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { t } = useTranslation()
    const { data: person, isLoading } = usePerson(id)
    const updateMutation = useUpdatePerson()
    
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        gender: '',
        nationalId: '',
        documentInfo: '',
        heightCm: '',
        chestCircumferenceCm: '',
        waistCircumferenceCm: '',
        shoeSize: '',
        clothingSize: '',
        active: true,
    })
    
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (person) {
            setFormData({
                lastName: person.lastName || '',
                firstName: person.firstName || '',
                middleName: person.middleName || '',
                birthDate: person.birthDate || '',
                gender: person.gender || '',
                nationalId: person.nationalId || '',
                documentInfo: person.documentInfo || '',
                heightCm: person.heightCm?.toString() || '',
                chestCircumferenceCm: person.chestCircumferenceCm?.toString() || '',
                waistCircumferenceCm: person.waistCircumferenceCm?.toString() || '',
                shoeSize: person.shoeSize || '',
                clothingSize: person.clothingSize || '',
                active: person.active ?? true,
            })
        }
    }, [person])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldErrors({})
        
        const errors: Record<string, string> = {}
        if (!formData.lastName) errors.lastName = t('common.required')
        if (!formData.firstName) errors.firstName = t('common.required')
        
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors)
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    lastName: formData.lastName,
                    firstName: formData.firstName,
                    middleName: formData.middleName || undefined,
                    birthDate: formData.birthDate || undefined,
                    gender: formData.gender || undefined,
                    nationalId: formData.nationalId || undefined,
                    documentInfo: formData.documentInfo || undefined,
                    heightCm: formData.heightCm ? parseInt(formData.heightCm) : undefined,
                    chestCircumferenceCm: formData.chestCircumferenceCm ? parseInt(formData.chestCircumferenceCm) : undefined,
                    waistCircumferenceCm: formData.waistCircumferenceCm ? parseInt(formData.waistCircumferenceCm) : undefined,
                    shoeSize: formData.shoeSize || undefined,
                    clothingSize: formData.clothingSize || undefined,
                    active: formData.active,
                }
            })
            toast.success(t('common.success'))
            router.push('/directories/persons')
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
    if (!person) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.directoriesSection'), href: '/directories' },
                { label: t('persons.title'), href: '/directories/persons' },
                { label: `${person.lastName} ${person.firstName}`, href: `/directories/persons/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('persons.editPerson')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <GovLabel required>{t('persons.lastName')}</GovLabel>
                                <GovInput
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    placeholder={t('persons.lastName')}
                                />
                                {fieldErrors.lastName && <p className="text-sm text-red-600 mt-1">{fieldErrors.lastName}</p>}
                            </div>

                            <div>
                                <GovLabel required>{t('persons.firstName')}</GovLabel>
                                <GovInput
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    placeholder={t('persons.firstName')}
                                />
                                {fieldErrors.firstName && <p className="text-sm text-red-600 mt-1">{fieldErrors.firstName}</p>}
                            </div>

                            <div>
                                <GovLabel>{t('persons.middleName')}</GovLabel>
                                <GovInput
                                    value={formData.middleName}
                                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                                    placeholder={t('persons.middleName')}
                                />
                                {fieldErrors.middleName && <p className="text-sm text-red-600 mt-1">{fieldErrors.middleName}</p>}
                            </div>

                            <div>
                                <GovLabel>{t('persons.birthDate')}</GovLabel>
                                <DatePicker
                                    value={formData.birthDate}
                                    onChange={(date) => setFormData({ ...formData, birthDate: date })}
                                    placeholder={t('persons.birthDate')}
                                />
                                {fieldErrors.birthDate && <p className="text-sm text-red-600 mt-1">{fieldErrors.birthDate}</p>}
                            </div>

                            <div>
                                <GovLabel>{t('persons.gender')}</GovLabel>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('common.select')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MALE">{t('persons.male')}</SelectItem>
                                        <SelectItem value="FEMALE">{t('persons.female')}</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldErrors.gender && <p className="text-sm text-red-600 mt-1">{fieldErrors.gender}</p>}
                            </div>

                            <div>
                                <GovLabel>{t('persons.nationalId')}</GovLabel>
                                <GovInput
                                    value={formData.nationalId}
                                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                                    placeholder={t('persons.nationalId')}
                                    maxLength={12}
                                />
                                {fieldErrors.nationalId && <p className="text-sm text-red-600 mt-1">{fieldErrors.nationalId}</p>}
                            </div>
                        </div>

                        <div>
                            <GovLabel>{t('persons.documentInfo')}</GovLabel>
                            <GovInput
                                value={formData.documentInfo}
                                onChange={(e) => setFormData({ ...formData, documentInfo: e.target.value })}
                                placeholder={t('persons.documentInfo')}
                            />
                            {fieldErrors.documentInfo && <p className="text-sm text-red-600 mt-1">{fieldErrors.documentInfo}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <GovLabel>{t('persons.heightCm')}</GovLabel>
                                <GovInput
                                    type="number"
                                    value={formData.heightCm}
                                    onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
                                    placeholder={t('persons.heightCm')}
                                />
                                {fieldErrors.heightCm && <p className="text-sm text-red-600 mt-1">{fieldErrors.heightCm}</p>}
                            </div>

                            <div>
                                <GovLabel>{t('persons.chestCircumferenceCm')}</GovLabel>
                                <GovInput
                                    type="number"
                                    value={formData.chestCircumferenceCm}
                                    onChange={(e) => setFormData({ ...formData, chestCircumferenceCm: e.target.value })}
                                    placeholder={t('persons.chestCircumferenceCm')}
                                />
                                {fieldErrors.chestCircumferenceCm && <p className="text-sm text-red-600 mt-1">{fieldErrors.chestCircumferenceCm}</p>}
                            </div>

                            <div>
                                <GovLabel>{t('persons.waistCircumferenceCm')}</GovLabel>
                                <GovInput
                                    type="number"
                                    value={formData.waistCircumferenceCm}
                                    onChange={(e) => setFormData({ ...formData, waistCircumferenceCm: e.target.value })}
                                    placeholder={t('persons.waistCircumferenceCm')}
                                />
                                {fieldErrors.waistCircumferenceCm && <p className="text-sm text-red-600 mt-1">{fieldErrors.waistCircumferenceCm}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <GovLabel>{t('persons.shoeSize')}</GovLabel>
                                <GovInput
                                    value={formData.shoeSize}
                                    onChange={(e) => setFormData({ ...formData, shoeSize: e.target.value })}
                                    placeholder={t('persons.shoeSize')}
                                />
                                {fieldErrors.shoeSize && <p className="text-sm text-red-600 mt-1">{fieldErrors.shoeSize}</p>}
                            </div>

                            <div>
                                <GovLabel>{t('persons.clothingSize')}</GovLabel>
                                <GovInput
                                    value={formData.clothingSize}
                                    onChange={(e) => setFormData({ ...formData, clothingSize: e.target.value })}
                                    placeholder={t('persons.clothingSize')}
                                />
                                {fieldErrors.clothingSize && <p className="text-sm text-red-600 mt-1">{fieldErrors.clothingSize}</p>}
                            </div>
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
