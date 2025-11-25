'use client'

import { useCreateUser } from '@/features/manage-users/model/useCreateUser'
import { useRoles } from '@/features/manage-roles/model/useRoles'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function UserCreateForm() {
    const { t } = useTranslation()
    const { mutateAsync } = useCreateUser()
    const { data: roles } = useRoles()
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        roles: [] as string[],
        active: true,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.username || !formData.password) {
            toast.error(t('common.required'))
            return
        }

        try {
            await mutateAsync(formData)
            toast.success(t('common.success'))
            router.push('/admin/users')
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('users.title'), href: '/admin/users' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('users.username')}</GovLabel>
                    <GovInput
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                        placeholder={t('users.username')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('users.password')}</GovLabel>
                    <GovInput
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        placeholder={t('users.password')}
                    />
                </div>

                <div>
                    <GovLabel>{t('users.roles')}</GovLabel>
                    <select 
                        multiple 
                        className="w-full border rounded px-3 py-2 min-h-[120px]"
                        value={formData.roles}
                        onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, option => option.value)
                            setFormData({ ...formData, roles: selected })
                        }}
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
                    <GovButton type="submit">
                        {t('common.create')}
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
