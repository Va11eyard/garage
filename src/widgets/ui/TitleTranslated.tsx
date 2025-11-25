'use client'

import { useTranslation } from '@/shared/i18n/use-translation'

export function TitleTranslated({ tKey }: { tKey: string }) {
    const { t } = useTranslation()
    return <h1 className="gov-title">{t(tKey)}</h1>
}
