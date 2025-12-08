'use client'

import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useDeleteWarehouse } from '@/features/manage-warehouses/model/useDeleteWarehouse'
import { usePagination } from '@/shared/hooks/use-pagination'
import { useFilters } from '@/shared/hooks/use-filters'
import { useConfirmDialog } from '@/shared/hooks/use-confirm-dialog'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { GovConfirmModal } from '@/gov-design/patterns/GovModal'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'
import Link from 'next/link'
import { Spinner } from '@/shared/ui/spinner'
import { Route } from 'next'

export function WarehousesTable() {
    const { t } = useTranslation()
    const { page, size, nextPage, previousPage, setSize } = usePagination()
    const { filters, debouncedFilters, updateFilter, setFilters } = useFilters({
        code: '',
        name: '',
        organizationId: '',
    })

    const { data: organizations } = useOrganizations({})
    const { data: warehousesData, isLoading } = useWarehouses({ 
        code: debouncedFilters.code, 
        name: debouncedFilters.name, 
        page, 
        size 
    })
    const deleteMutation = useDeleteWarehouse()
    const confirmDialog = useConfirmDialog()

    // Filter by organization on the client side (using immediate filter, not debounced)
    const warehouses = warehousesData ? {
        ...warehousesData,
        content: (warehousesData.content || []).filter((warehouse: any) => {
            if (!filters.organizationId) return true
            return warehouse.organizationId === filters.organizationId
        }),
        // Update total count to reflect filtered results
        totalElements: (warehousesData.content || []).filter((warehouse: any) => {
            if (!filters.organizationId) return true
            return warehouse.organizationId === filters.organizationId
        }).length
    } : warehousesData

    const handleDelete = (id: string) => {
        confirmDialog.showConfirm(
            t('warehouses.deleteConfirm'),
            t('warehouses.deleteMessage') || 'Вы уверены, что хотите удалить этот склад?',
            () => {
                deleteMutation.mutate(id, {
                    onSuccess: () => toast.success(t('common.success')),
                    onError: (error: any) => toast.error(getErrorMessage(error)),
                })
            }
        )
    }

    const handleOrganizationChange = (value: string) => {
        const orgId = value === '__ALL__' ? '' : value
        setFilters({ ...filters, organizationId: orgId })
    }

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4 flex-1">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouses.organization')}</label>
                        <Select value={filters.organizationId || '__ALL__'} onValueChange={handleOrganizationChange}>
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
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouses.code')}</label>
                        <Input
                            placeholder={t('warehouses.code')}
                            value={filters.code}
                            onChange={(e) => updateFilter('code', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('warehouses.name')}</label>
                        <Input
                            placeholder={t('warehouses.name')}
                            value={filters.name}
                            onChange={(e) => updateFilter('name', e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
                <Button variant="default" asChild className="shrink-0 text-black">
                    <Link href="/directories/warehouses/create">{t('warehouses.create')}</Link>
                </Button>
            </div>


            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('warehouses.code')}</TableHead>
                        <TableHead>{t('warehouses.name')}</TableHead>
                        <TableHead>{t('warehouses.address')}</TableHead>
                        <TableHead>{t('warehouses.description')}</TableHead>
                        <TableHead>{t('warehouses.status')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {warehouses?.content?.map((warehouse: any) => (
                        <TableRow key={warehouse.id}>
                            <TableCell>{warehouse.code}</TableCell>
                            <TableCell>
                                <Link href={`/directories/warehouses/${warehouse.id}` as Route} className="underline">
                                    {warehouse.name}
                                </Link>
                            </TableCell>
                            <TableCell>{warehouse.address || '—'}</TableCell>
                            <TableCell>{warehouse.description || '—'}</TableCell>
                            <TableCell>
                                <span className={warehouse.active ? 'text-green-600' : 'text-red-600'}>
                                  {warehouse.active ? t('common.active') : t('common.inactive')}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/directories/warehouses/${warehouse.id}` as Route}>{t('common.view')}</Link>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/directories/warehouses/${warehouse.id}/edit` as Route}>{t('common.edit')}</Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(warehouse.id!)}
                                >
                                    {t('common.delete')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center">
                <Button onClick={previousPage} disabled={page === 0}>{t('pagination.prev')}</Button>
                <span className="text-sm text-gov-text-secondary">
                  {t('pagination.page')} {page + 1} {t('pagination.of')} {warehouses?.totalPages ?? 1}
                </span>
                <Button onClick={nextPage} disabled={warehouses?.last || page >= (warehouses?.totalPages ?? 1) - 1}>{t('pagination.next')}</Button>
            </div>

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
