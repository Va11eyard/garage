'use client'

import { useCreateUser } from '@/features/manage-users/model/useCreateUser'
import { useRoles } from '@/features/manage-roles/model/useRoles'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { X } from 'lucide-react'
import { getErrorMessage } from '@/shared/utils/error-handler'

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
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    const handleRoleSelect = (roleCode: string) => {
        if (!formData.roles.includes(roleCode)) {
            setFormData({ ...formData, roles: [...formData.roles, roleCode] })
        }
    }

    const handleRoleRemove = (roleCode: string) => {
        setFormData({ ...formData, roles: formData.roles.filter(r => r !== roleCode) })
    }

    const availableRoles = roles?.filter((role: any) => !formData.roles.includes(role.code)) || []

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
                    <Select onValueChange={handleRoleSelect}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select') + ' ' + t('users.roles').toLowerCase() + '...'} />
                        </SelectTrigger>
                        <SelectContent>
                            {availableRoles.map((role: any) => (
                                <SelectItem key={role.code} value={role.code}>
                                    {role.code} - {role.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {formData.roles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.roles.map((roleCode) => {
                                const role = roles?.find((r: any) => r.code === roleCode)
                                return (
                                    <span
                                        key={roleCode}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-gov-blue-100 text-gov-blue-700 rounded-md text-sm"
                                    >
                                        {role?.code || roleCode}
                                        <button
                                            type="button"
                                            onClick={() => handleRoleRemove(roleCode)}
                                            className="hover:bg-gov-blue-200 rounded p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )
                            })}
                        </div>
                    )}
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
