'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import { useAuth } from '@/shared/hooks/use-auth'
import { LanguageSwitcher } from '@/widgets/ui/LanguageSwitcher'
import { useTranslation } from '@/shared/i18n/use-translation'

export function Header() {
    const router = useRouter()
    const { logout } = useAuth()
    const { t } = useTranslation()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <header className="bg-gradient-to-r text-black shadow-sm w-full">
            <div className="w-full">
                <div className="flex items-center justify-between h-16 px-6">
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div>
                            <h1 className="text-xl font-bold text-black">{t('auth.systemTitle')}</h1>
                            <p className="text-xs text-black opacity-90">{t('auth.systemSubtitle')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <LanguageSwitcher />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-black hover:bg-white/20 transition-colors"
                        >
                            {t('auth.logout')}
                        </Button>
                    </div>
                </div>
                
                <nav className="hidden md:flex items-center h-12 px-6 border-t border-white/20 gap-6 bg-gov-blue-700/50">
                    <Link href="/directories" className="text-sm hover:text-gov-gold-400 transition-colors py-3 border-b-2 border-transparent hover:border-gov-gold-400">
                        {t('nav.directories')}
                    </Link>
                    <Link href="/staff" className="text-sm hover:text-gov-gold-400 transition-colors py-3 border-b-2 border-transparent hover:border-gov-gold-400">
                        {t('nav.staff')}
                    </Link>
                    <Link href="/inventory" className="text-sm hover:text-gov-gold-400 transition-colors py-3 border-b-2 border-transparent hover:border-gov-gold-400">
                        {t('nav.inventory')}
                    </Link>
                    <Link href="/admin" className="text-sm hover:text-gov-gold-400 transition-colors py-3 border-b-2 border-transparent hover:border-gov-gold-400">
                        {t('nav.admin')}
                    </Link>
                </nav>
            </div>
        </header>
    )
}
