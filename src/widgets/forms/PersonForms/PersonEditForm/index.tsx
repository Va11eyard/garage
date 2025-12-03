'use client'

import { usePerson } from '@/features/manage-persons/model/usePerson'
import { useUpdatePerson } from '@/features/manage-persons/model/useUpdatePerson'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function PersonEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: person, isLoading } = usePerson(id)
    const updatePerson = useUpdatePerson(id)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        if (person) {
            setFullName(person.fullName || '')
            setEmail(person.email || '')
            setPhone(person.phone || '')
        }
    }, [person])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updatePerson.mutateAsync({ fullName, email, phone })
            router.push(`/directories/persons/${id}` as any)
        } catch (error) {
            console.error('Failed to update person:', error)
        }
    }

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!person) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('persons.edit')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="fullName">{t('persons.fullName')}</Label>
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">{t('persons.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">{t('persons.phone')}</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={updatePerson.isPending}>
                                {updatePerson.isPending ? t('common.saving') : t('common.save')}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                {t('common.cancel')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
