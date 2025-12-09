'use client'

import { useCreateTemporaryIssue } from '@/features/manage-temporary-issues/model/useCreateTemporaryIssue'
import { useWarehousesByOrganization } from '@/features/manage-warehouses/model/useWarehousesByOrganization'
import { useOrganizations } from '@/features/manage-organizations/model/useOrganizations'
import { useTranslation } from '@/shared/i18n/use-translation'
import { GovBreadcrumb } from '@/gov-design/patterns'
import { GovButton } from '@/gov-design/components/Button'
import { GovInput, GovLabel } from '@/gov-design/components/Form'
import { DatePicker } from '@/shared/ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function TemporaryIssueCreateForm() {
    const { t } = useTranslation()
    const { mutateAsync } = useCreateTemporaryIssue()
    const { data: organizations } = useOrganizations({ page: 0, size: 100 })
    const router = useRouter()
    
    const [selectedOrgId, setSelectedOrgId] = useState<string>()
    const { data: warehouses } = useWarehousesByOrganization(selectedOrgId)
    const [employees, setEmployees] = useState<any[]>([])
    
    // Fetch employees when organization is selected
    useEffect(() => {
        if (selectedOrgId) {
            import('@/shared/api/generated/__swagger_client').then(({ Service }) => {
                Service.searchEmployeesPage(selectedOrgId, undefined, undefined, 0, 1000).then((data) => {
                    setEmployees(data.content || [])
                }).catch(error => {
                    console.error('Failed to fetch employees:', error)
                })
            })
        } else {
            setEmployees([])
        }
    }, [selectedOrgId])
    
    const [formData, setFormData] = useState({
        docNumber: '',
        docDate: '',
        organizationId: '',
        warehouseId: '',
        employeeId: '',
        reason: '',
        plannedReturnDate: '',
    })



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.docNumber?.trim()) {
            toast.error(t('documents.documentNumber') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.docDate) {
            toast.error(t('documents.documentDate') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.organizationId) {
            toast.error(t('organizations.organization') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.warehouseId) {
            toast.error(t('documents.warehouse') + ': ' + t('common.required'))
            return
        }
        
        if (!formData.employeeId) {
            toast.error(t('employees.employee') + ': ' + t('common.required'))
            return
        }

        try {
            const created = await mutateAsync({
                docNumber: formData.docNumber.trim(),
                docDate: formData.docDate,
                organizationId: formData.organizationId,
                warehouseId: formData.warehouseId,
                employeeId: formData.employeeId,
                reason: formData.reason || undefined,
                plannedReturnDate: formData.plannedReturnDate || undefined,
                lines: []
            })
            toast.success(t('common.success'))
            router.push(`/inventory/temporary-use/${created.id}`)
        } catch (error: any) {
            toast.error(error?.body?.message || t('common.error'))
        }
    }

    return (
        <div className="space-y-6">
            <GovBreadcrumb items={[
                { label: t('breadcrumbs.inventory'), href: '/inventory' },
                { label: t('temporaryIssues.title'), href: '/inventory/temporary-use' },
                { label: t('common.create') }
            ]} />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div>
                    <GovLabel required>{t('documents.documentNumber')}</GovLabel>
                    <GovInput
                        value={formData.docNumber}
                        onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                        required
                        placeholder={t('documents.documentNumber')}
                    />
                </div>

                <div>
                    <GovLabel required>{t('documents.documentDate')}</GovLabel>
                    <DatePicker
                        value={formData.docDate}
                        onChange={(date) => setFormData({ ...formData, docDate: date })}
                    />
                </div>

                <div>
                    <GovLabel required>{t('organizations.organization')}</GovLabel>
                    <Select
                        value={formData.organizationId}
                        onValueChange={(value) => {
                            setFormData({ ...formData, organizationId: value, warehouseId: '', employeeId: '' })
                            setSelectedOrgId(value)
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t('common.select')} />
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

                <div>
                    <GovLabel required>{t('documents.warehouse')}</GovLabel>
                    <Select
                        value={formData.warehouseId}
                        onValueChange={(value) => setFormData({ ...formData, warehouseId: value })}
                        disabled={!selectedOrgId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={selectedOrgId ? t('common.select') : t('common.selectOrganizationFirst')} />
                        </SelectTrigger>
                        <SelectContent>
                            {warehouses?.map((wh: any) => (
                                <SelectItem key={wh.id} value={wh.id!}>
                                    {wh.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel required>{t('employees.employee')}</GovLabel>
                    <Select
                        value={formData.employeeId}
                        onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
                        disabled={!formData.organizationId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={formData.organizationId ? t('common.select') : t('organizations.selectFirst')} />
                        </SelectTrigger>
                        <SelectContent>
                            {employees?.map((emp: any) => (
                                <SelectItem key={emp.id} value={emp.id!}>
                                    {emp.lastName} {emp.firstName} {emp.middleName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <GovLabel>{t('documents.reason')}</GovLabel>
                    <GovInput
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder={t('documents.reason')}
                    />
                </div>

                <div>
                    <GovLabel>{t('temporaryIssues.plannedReturnDate')}</GovLabel>
                    <DatePicker
                        value={formData.plannedReturnDate}
                        onChange={(date) => setFormData({ ...formData, plannedReturnDate: date })}
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <GovButton type="submit">
                        {t('common.create')}
                    </GovButton>
                    <GovButton 
                        type="button" 
                        variant="secondary"
                        onClick={() => router.back()}
                    >
                        {t('common.cancel')}
                    </GovButton>
                </div>
            </form>
        </div>
    )
}
