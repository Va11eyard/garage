'use client'

import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'

export function RoleEditForm({ code }: { code: string }) {
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <div className="gov-page-content">
            <div className="gov-card max-w-2xl space-y-6">
                <h2 className="gov-title">{t('roles.editRole')}</h2>
                
                <div className="space-y-2">
                    <p className="text-sm text-[var(--gov-gray)]">{t('roles.code')}</p>
                    <p className="text-lg font-semibold">{code}</p>
                </div>

                <p className="text-sm text-[var(--gov-gray)]">
                    Role editing is not yet implemented. Roles are managed through the system configuration.
                </p>

                <Button type="button" onClick={() => router.back()} className="gov-button-secondary">
                    {t('common.back')}
                </Button>
            </div>
        </div>
    )
}
