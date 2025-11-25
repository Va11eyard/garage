'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale } from './config'
import { DEFAULT_LOCALE } from './config'

interface LocaleStore {
    locale: Locale
    setLocale: (locale: Locale) => void
}

export const useLocale = create<LocaleStore>()(
    persist(
        (set) => ({
            locale: DEFAULT_LOCALE,
            setLocale: (locale) => set({ locale }),
        }),
        {
            name: 'locale-storage',
        }
    )
)
