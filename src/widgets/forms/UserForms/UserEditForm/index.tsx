'use client'

import { useUser } from '@/features/manage-users/model/useUser'
import { useUpdateUser } from '@/features/manage-users/model/useUpdateUser'
import { useRoles } from '@/features/manage-roles/model/useRoles'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function UserEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: user, isLoading } = useUser(id)
    const updateMutation = useUpdateUser()
    const { data: roles } = useRoles()
    const router = useRouter()

    const [formData, setFormData] = useState({
        username: '',
        roles: [] as string[],
        active: true,
    })

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                roles: user.roles || [],
                active: user.active ?? true,
            })
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.username) {
            toast.error(t('common.required'))
            return
        }

        try {
            await updateMutation.mutateAsync({
                id,
                data: {
                    roles: formData.roles,
                    active: formData.active,
                }
            })
            toast.success(t('common.success'))
            router.push('/admin/users')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <Spinner />
    if (!user) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.adminSection'), href: '/admin' },
                { label: t('users.title'), href: '/admin/users' },
                { label: user.username || '', href: `/admin/users/${id}` },
                { label: t('common.edit') }
            ]} />

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('users.editUser')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <GovLabel required>{t('users.username')}</GovLabel>
                            <GovInput
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                                disabled
                                placeholder={t('users.username')}
                            />
                        </div>

                        <div>
                            <GovLabel>{t('users.roles')}</GovLabel>
                            <select
                                multiple
                                value={formData.roles}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value)
                                    setFormData({ ...formData, roles: selected })
                                }}
                                className="w-full border rounded px-3 py-2 min-h-[120px]"
                            >
                                {roles?.map((role: any) => (
                                    <option key={role.code} value={role.code}>
                                        {role.code} - {role.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="active"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <GovLabel htmlFor="active" className="mb-0">{t('users.active')}</GovLabel>
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
