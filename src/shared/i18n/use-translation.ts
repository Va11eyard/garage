'use client'

import { useLocale } from './use-locale'
import { translations } from './translations'

export function useTranslation() {
    const { locale } = useLocale()

    const t = (key: string): string => {
        const keys = key.split('.')
        let value: any = translations[locale]

        for (const k of keys) {
            value = value?.[k]
        }

        return value || key
    }

    return { t, locale }
}
