'use client'

import { useUser } from '@/features/manage-users/model/useUser'
import { useUpdateUser } from '@/features/manage-users/model/useUpdateUser'
import { useRoles } from '@/features/manage-roles/model/useRoles'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function UserEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: user, isLoading } = useUser(id)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const { mutateAsync } = useUpdateUser()
    const { data: roles } = useRoles()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                roles: user.roles || [],
                active: user.enabled
            })
        }
    }, [user, reset])

    const onSubmit = async (data: any) => {
        try {
            await mutateAsync({ id, data })
            toast.success(t('common.success'))
            router.push('/admin/users')
        } catch {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <div className="gov-page-content">{t('common.loading')}</div>

    return (
        <div className="gov-page-content">
            <form onSubmit={handleSubmit(onSubmit)} className="gov-card max-w-2xl space-y-6">
                <h2 className="gov-title">{t('users.editUser')}</h2>
                
                <div className="space-y-2">
                    <Label className="gov-label">{t('users.username')}</Label>
                    <Input {...register('username', { required: true })} className="gov-input" disabled />
                </div>

                <div className="space-y-2">
                    <Label className="gov-label">{t('users.roles')}</Label>
                    <select {...register('roles')} multiple className="gov-input min-h-[120px]">
                        {roles?.map((role: any) => (
                            <option key={role.code} value={role.code}>
                                {role.code} - {role.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register('active')} id="active" className="gov-checkbox" />
                    <Label htmlFor="active" className="gov-label">{t('users.active')}</Label>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={isSubmitting} className="gov-button-primary">
                        {t('common.save')}
                    </Button>
                    <Button type="button" onClick={() => router.back()} className="gov-button-secondary">
                        {t('common.cancel')}
                    </Button>
                </div>
            </form>
        </div>
    )
}
