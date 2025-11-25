'use client'

import { useLocale } from '@/shared/i18n/use-locale'
import { LOCALE_NAMES, SUPPORTED_LOCALES, type Locale } from '@/shared/i18n/config'
import { Button } from '@/shared/ui/button'

export function LanguageSwitcher() {
    const { locale, setLocale } = useLocale()

    return (
        <div className="flex text-black gap-2">
            {SUPPORTED_LOCALES.map((lang) => (
                <Button
                    key={lang}
                    variant={locale === lang ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setLocale(lang as Locale)}
                    className={locale === lang ? 'text-gov-primary' : 'text-black'}
                >
                    {LOCALE_NAMES[lang]}
                </Button>
            ))}
        </div>
    )
}
