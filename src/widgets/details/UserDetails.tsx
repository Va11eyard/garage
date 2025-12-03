'use client'

import { useUser } from '@/features/manage-users/model/useUser'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import Link from 'next/link'

export function UserDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: user, isLoading } = useUser(id)

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!user) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <Link href={`/admin/users/${id}/edit`}>
                    <Button>{t('common.edit')}</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t('users.details')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <span className="font-semibold">{t('users.username')}: </span>
                        <span>{user.username}</span>
                    </div>
                    {user.email && (
                        <div>
                            <span className="font-semibold">{t('users.email')}: </span>
                            <span>{user.email}</span>
                        </div>
                    )}
                    {user.fullName && (
                        <div>
                            <span className="font-semibold">{t('users.fullName')}: </span>
                            <span>{user.fullName}</span>
                        </div>
                    )}
                    <div>
                        <span className="font-semibold">{t('users.status')}: </span>
                        <span className={`px-2 py-1 rounded ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                            {user.isActive ? t('users.active') : t('users.inactive')}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {user.roles && user.roles.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t('users.roles')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                            {user.roles.map((role: any, idx: number) => (
                                <li key={idx}>{role.name || role}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
