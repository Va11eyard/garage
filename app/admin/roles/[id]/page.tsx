'use client'

import { AdminGuard } from '@/widgets/layouts/AdminGuard'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { useTranslation } from '@/shared/i18n/use-translation'

export default function RolePage({ params }: { params: { id: string } }) {
    const { t } = useTranslation()

    return (
        <AdminGuard>
            <div className="container mx-auto py-6 space-y-6">
                <GovBreadcrumb items={[
                    { label: t('breadcrumbs.admin'), href: '/admin' },
                    { label: t('roles.title'), href: '/admin/roles' },
                    { label: params.id }
                ]} />
                <div>Role Details: {params.id}</div>
            </div>
        </AdminGuard>
    )
}
