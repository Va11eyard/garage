'use client'

import { useCreateRole } from '@/features/manage-roles/model/useCreateRole'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function RoleCreateForm() {
    const { t } = useTranslation()
    const { mutateAsync } = useCreateRole()
    const router = useRouter()
    
    const [code, setCode] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!code) {
            toast.error(t('common.required'))
            return
        }

        try {
            await mutateAsync(code)
            toast.success(t('common.success'))
            router.push('/admin/roles')
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.admin'), href: '/admin' },
                { label: t('roles.title'), href: '/admin/roles' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('roles.code')}</GovLabel>
                    <GovInput
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        placeholder="ROLE_USER"
                    />
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
