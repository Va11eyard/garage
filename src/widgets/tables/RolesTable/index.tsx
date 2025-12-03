'use client'

import { useRoles } from '@/features/manage-roles/model/useRoles'
import { GovTable, GovTableBody, GovTableCell, GovTableHead, GovTableHeader, GovTableRow } from '@/gov-design/components/Table'
import { GovButton } from '@/gov-design/components/Button'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { usePagination } from '@/shared/hooks/use-pagination'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export function RolesTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const { page, size, nextPage, previousPage } = usePagination()
    const { data, isLoading } = useRoles()

    if (isLoading) return <div className="text-center py-8 text-gov-gray-600">{t('common.loading')}</div>

    // Calculate pagination for client-side data
    const totalItems = data?.length || 0
    const totalPages = Math.ceil(totalItems / size)
    const startIndex = page * size
    const endIndex = startIndex + size
    const paginatedData = data?.slice(startIndex, endIndex) || []

    return (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <GovButton variant="primary" asChild className="text-black">
                    <Link href="/admin/roles/create">{t('roles.createRole')}</Link>
                </GovButton>
            </div>

            <GovTable>
                <GovTableHeader>
                    <GovTableRow>
                        <GovTableHead>{t('roles.code')}</GovTableHead>
                        {!isMobile && <GovTableHead>{t('roles.description')}</GovTableHead>}
                    </GovTableRow>
                </GovTableHeader>
                <GovTableBody>
                    {paginatedData.map((role: any) => (
                        <GovTableRow key={role.code}>
                            <GovTableCell className="font-medium">{role.code}</GovTableCell>
                            {!isMobile && <GovTableCell>{role.description || '-'}</GovTableCell>}
                        </GovTableRow>
                    ))}
                </GovTableBody>
            </GovTable>

            <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={page === 0}>
                    {t('pagination.prev')}
                </Button>
                <span className="text-sm text-gov-text-secondary">
                    {t('pagination.page')} {page + 1} {t('pagination.of')} {totalPages || 1}
                </span>
                <Button onClick={nextPage} disabled={page >= totalPages - 1}>
                    {t('pagination.next')}
                </Button>
            </div>
        </div>
    )
}
