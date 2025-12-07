'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLogin } from '@/features/auth/login/model/useLogin'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle, GovCardDescription } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { toast } from 'sonner'
import { useTranslation } from '@/shared/i18n/use-translation'
import { LanguageSwitcher } from '@/widgets/ui/LanguageSwitcher'
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const { t } = useTranslation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const loginMutation = useLogin()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const result = await loginMutation.mutateAsync({ username, password })
            document.cookie = `auth_token=${result.token}; path=/; max-age=86400`

            console.log('Login successful, roles:', result.roles)

            toast.success(t('auth.loginSuccess'))

            setTimeout(() => {
                if (result.roles?.includes('ADMIN')) {
                    console.log('Redirecting to /admin')
                    router.push('/dashboard')
                } else {
                    console.log('Redirecting to /dashboard')
                    router.push('/dashboard')
                }
            }, 100)
        } catch (error: any) {
            console.error('Login error:', error)
            
            // Handle different error types
            let errorMessage = t('auth.loginError')
            
            if (error.status === 401 || error.statusCode === 401) {
                errorMessage = t('auth.invalidCredentials')
            } else if (error.status === 403 || error.statusCode === 403) {
                errorMessage = t('auth.accessDenied')
            } else if (error.status === 500 || error.statusCode === 500 || error.message?.includes('Internal Server Error')) {
                errorMessage = t('auth.invalidCredentials')
            } else if (error.message && !error.message.includes('Internal Server Error')) {
                errorMessage = error.message
            }
            
            toast.error(errorMessage)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gov-blue-500 via-gov-blue-600 to-gov-blue-700 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="absolute top-4 right-4">
                    <LanguageSwitcher />
                </div>

                <GovCard className="shadow-2xl">
                    <GovCardHeader gradient={true}>
                        <div className="flex flex-col items-center text-center">
                            <GovCardTitle className="text-black">
                                {t('auth.systemTitle')}
                            </GovCardTitle>
                            <GovCardDescription className="text-black/90">
                                {t('auth.systemSubtitle')}
                            </GovCardDescription>
                        </div>
                    </GovCardHeader>

                    <GovCardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-semibold text-gov-gray-700">
                                    {t('auth.username')}
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gov-gray-400" />
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-10 h-11 border-gov-gray-300 focus:border-gov-blue-500 focus:ring-gov-blue-500"
                                        placeholder={t('auth.usernamePlaceholder')}
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold text-gov-gray-700">
                                    {t('auth.password')}
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gov-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 h-11 border-gov-gray-300 focus:border-gov-blue-500 focus:ring-gov-blue-500"
                                        placeholder={t('auth.passwordPlaceholder')}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gov-gray-400 hover:text-gov-gray-600 transition-colors focus:outline-none"
                                        aria-label={showPassword ? t('auth.hidePassword') || "Скрыть пароль" : t('auth.showPassword') || "Показать пароль"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <GovButton
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full text-black"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? t('common.loading') : t('auth.loginButton')}
                            </GovButton>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gov-gray-200">
                            <div className="text-xs text-gov-gray-500 text-center space-y-1">
                                <p>{t('auth.loginInstructions')}</p>
                                <p className="flex items-center justify-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    {t('auth.secureConnection')}
                                </p>
                            </div>
                        </div>
                    </GovCardContent>
                </GovCard>

                <div className="mt-6 text-center text-black text-sm">
                    <p className="opacity-90">{t('auth.copyright')}</p>
                </div>
            </div>
        </div>
    )
}
