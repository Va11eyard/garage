'use client'

import { useUser } from '@/features/manage-users/model/useUser'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovCard, GovCardContent, GovCardHeader, GovCardTitle } from '@/gov-design/components/Card'
import { GovButton } from '@/gov-design/components/Button'
import { Spinner } from '@/shared/ui/spinner'
import Link from 'next/link'

export function UserDetails({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: user, isLoading } = useUser(id)

    if (isLoading) return <Spinner />
    if (!user) return <div>{t('common.notFound')}</div>

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('sidebar.adminSection'), href: '/admin' },
                { label: t('users.title'), href: '/admin/users' },
                { label: user.username || '' }
            ]} />

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <Link href={`/admin/users/${id}/edit`}>
                    <GovButton>{t('common.edit')}</GovButton>
                </Link>
            </div>

            <GovCard>
                <GovCardHeader>
                    <GovCardTitle>{t('users.details')}</GovCardTitle>
                </GovCardHeader>
                <GovCardContent className="space-y-3">
                    <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="font-semibold">{t('users.username')}:</span>
                        <span>{user.username}</span>
                    </div>
                    {user.email && (
                        <div className="grid grid-cols-[200px_1fr] gap-2">
                            <span className="font-semibold">{t('users.email')}:</span>
                            <span>{user.email}</span>
                        </div>
                    )}
                    {user.fullName && (
                        <div className="grid grid-cols-[200px_1fr] gap-2">
                            <span className="font-semibold">{t('users.fullName')}:</span>
                            <span>{user.fullName}</span>
                        </div>
                    )}
                    <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="font-semibold">{t('users.status')}:</span>
                        <span className={user.enabled ? 'text-green-600' : 'text-red-600'}>
                            {user.enabled ? t('common.active') : t('common.inactive')}
                        </span>
                    </div>
                </GovCardContent>
            </GovCard>

            {user.roles && user.roles.length > 0 && (
                <GovCard>
                    <GovCardHeader>
                        <GovCardTitle>{t('users.roles')}</GovCardTitle>
                    </GovCardHeader>
                    <GovCardContent>
                        <ul className="list-disc list-inside space-y-1">
                            {user.roles.map((role: any, idx: number) => (
                                <li key={idx}>{role.name || role}</li>
                            ))}
                        </ul>
                    </GovCardContent>
                </GovCard>
            )}
        </div>
    )
}
