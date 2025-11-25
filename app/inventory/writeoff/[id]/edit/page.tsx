'use client'

import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { useRouter } from 'next/navigation'

export default function WriteOffEditPage({ params }: { params: { id: string } }) {
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <div className="gov-page-content">
            <div className="gov-card max-w-2xl space-y-6">
                <h2 className="gov-title">{t('writeOffs.editWriteOff')}</h2>
                <p className="text-[var(--gov-gray)]">Write-off document editing form will be implemented here.</p>
                <Button onClick={() => router.back()} className="gov-button-secondary">
                    {t('common.back')}
                </Button>
            </div>
        </div>
    )
}
