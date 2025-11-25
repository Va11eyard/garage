export const SUPPORTED_LOCALES = ['ru', 'kk'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'kk'

export const LOCALE_NAMES: Record<Locale, string> = {
    ru: 'Русский',
    kk: 'Қазақша',
}
