'use client'

import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useOrgUnitsByOrganization } from '@/features/manage-org-units/model/useOrgUnitsByOrganization'
import { useDeleteOrgUnit } from '@/features/manage-org-units/model/useDeleteOrgUnit'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useMobile } from '@/shared/hooks/use-mobile'
import { toast } from 'sonner'
import Link from 'next/link'
import { useState } from 'react'
import { Route } from 'next'

export function OrgUnitsTable() {
    const { t } = useTranslation()
    const isMobile = useMobile()
    const [selectedOrgId, setSelectedOrgId] = useState<string>('')
    const { data: organizations } = useOrganizations({})
    const { data: orgUnits, isLoading } = useOrgUnitsByOrganization(selectedOrgId)
    const deleteMutation = useDeleteOrgUnit()

    const handleDelete = (id: string) => {
        if (confirm(t('orgUnits.deleteConfirm'))) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success(t('common.success')),
                onError: () => toast.error(t('common.error')),
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4 mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">{t('organizations.organization')}</label>
                    <Select onValueChange={setSelectedOrgId}>
                        <SelectTrigger className="max-w-md">
                            <SelectValue placeholder={t('organizations.selectOrganization')} />
                        </SelectTrigger>
                        <SelectContent>
                            {organizations?.content?.map((org: any) => (
                                <SelectItem key={org.id} value={org.id!}>
                                    {org.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Link href="/directories/org-units/create">
                    <Button className="shrink-0">{t('orgUnits.createUnit')}</Button>
                </Link>
            </div>

            {isLoading && <div>{t('common.loading')}</div>}

            {!selectedOrgId && <div className="text-center py-8">{t('organizations.selectOrganization')}</div>}

            {selectedOrgId && orgUnits && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('orgUnits.code')}</TableHead>
                            <TableHead>{t('orgUnits.name')}</TableHead>
                            {!isMobile && <TableHead>{t('orgUnits.type')}</TableHead>}
                            <TableHead>{t('common.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orgUnits.map((unit: any) => (
                            <TableRow key={unit.id}>
                                <TableCell>{unit.code}</TableCell>
                                <TableCell>{unit.name}</TableCell>
                                {!isMobile && <TableCell>{unit.type || '-'}</TableCell>}
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
        </div>
    )
}
