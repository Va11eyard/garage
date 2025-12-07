'use client'

import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnits } from '@/features/manage-org-units/model/useOrgUnits'
import { useDeleteOrgUnit } from '@/features/manage-org-units/model/useDeleteOrgUnit'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'

import { useFilters } from '@/shared/hooks/use-filters'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { getErrorMessage } from '@/shared/utils/error-handler'
import { toast } from 'sonner'
import Link from 'next/link'
import { useState } from 'react'
import { Route } from 'next'

export function OrgUnitsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()

    const { filters, debouncedFilters, updateFilter } = useFilters({ code: '', name: '' })
    const [selectedOrgId, setSelectedOrgId] = useState<string>('__ALL__')
    
    const { data: organizations } = useOrganizations({})
    
    // Get all organization IDs for "All" filter
    const organizationIds = organizations?.content?.map((org: any) => org.id).filter(Boolean) || []
    
    // Create organization ID to name map
    const orgMap = new Map(
        organizations?.content?.map((org: any) => [org.id, org.name]) || []
    )
    
    const { data: orgUnitsData, isLoading } = useOrgUnits({
        code: debouncedFilters.code,
        name: debouncedFilters.name,
        organizationId: selectedOrgId !== '__ALL__' ? selectedOrgId : undefined,
        organizationIds: selectedOrgId === '__ALL__' ? organizationIds : undefined,
    })
    
    const deleteMutation = useDeleteOrgUnit()
    const confirmDialog = useConfirmDialog()

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('orgUnits.deleteConfirm'),
            t('orgUnits.deleteMessage') || 'Вы уверены, что хотите удалить это подразделение?',
            () => {
                deleteMutation.mutate(id, {
                    onSuccess: () => toast.success(t('common.success')),
                    onError: (error: any) => toast.error(getErrorMessage(error)),
                })
            }
        )
    }

    const orgUnits = orgUnitsData || []

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('orgUnits.code')}</label>
                        <Input
                            placeholder={t('orgUnits.code')}
                            value={filters.code}
                            onChange={(e) => updateFilter('code', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('orgUnits.name')}</label>
                        <Input
                            placeholder={t('orgUnits.name')}
                            value={filters.name}
                            onChange={(e) => updateFilter('name', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('organizations.organization')}</label>
                        <Select value={selectedOrgId} onValueChange={setSelectedOrgId}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={t('common.all')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__ALL__">{t('common.all')}</SelectItem>
                                {organizations?.content?.map((org: any) => (
                                    <SelectItem key={org.id} value={org.id!}>
                                        {org.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Link href="/directories/org-units/create">
                    <Button className="shrink-0">{t('orgUnits.createUnit')}</Button>
                </Link>
            </div>

            {isLoading && <div>{t('common.loading')}</div>}

            {!isLoading && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('orgUnits.code')}</TableHead>
                            <TableHead>{t('orgUnits.name')}</TableHead>
                            {!isMobile && <TableHead>{t('organizations.organization')}</TableHead>}
                            {!isMobile && <TableHead>{t('orgUnits.type')}</TableHead>}
                            {!isMobile && <TableHead>{t('common.status')}</TableHead>}
                            <TableHead>{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orgUnits.map((unit: any) => (
                            <TableRow key={unit.id}>
                                <TableCell>{unit.code}</TableCell>
                                <TableCell>{unit.name}</TableCell>
                                {!isMobile && <TableCell>{String(orgMap.get(unit.organizationId) || '-')}</TableCell>}
                                {!isMobile && <TableCell>{unit.unitType || '-'}</TableCell>}
                                {!isMobile && (
                                    <TableCell>
                                        <span className={unit.active ? 'text-green-600' : 'text-red-600'}>
                                            {unit.active ? t('common.active') : t('common.inactive')}
                                        </span>
                                    </TableCell>
                                )}
                                <TableCell>
                                    <Link href={`/directories/org-units/${unit.id}` as Route}>
                                        <Button variant="ghost" size="sm">
                                            {t('common.view')}
                                        </Button>
                                    </Link>
                                    <Link href={`/directories/org-units/${unit.id}/edit` as Route}>
                                        <Button variant="ghost" size="sm">
                                            {t('common.edit')}
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600"
                                        onClick={() => handleDelete(unit.id!)}
                                    >
                                        {t('common.delete')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* No pagination - using list endpoint */}

            <GovConfirmModal
                isOpen={confirmDialog.isOpen}
                onClose={confirmDialog.hideConfirm}
                onConfirm={confirmDialog.handleConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
                confirmText={t('common.delete')}
                cancelText={t('common.cancel')}
                variant="danger"
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
