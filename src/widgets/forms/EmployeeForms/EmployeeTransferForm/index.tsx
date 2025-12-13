'use client'

import { useTransferEmployee } from '@/features/manage-employees/model/useTransferEmployee'
import { useEmployee } from '@/features/manage-employees/model/useEmployee'
import { useOrgUnits } from '@/features/manage-org-units/model/useOrgUnits'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function EmployeeTransferForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: employee, isLoading } = useEmployee(id)
    const { data: orgUnits } = useOrgUnits({ organizationId: employee?.organizationId || '' })
    const transferEmployee = useTransferEmployee(id)
    const [transferDate, setTransferDate] = useState('')
    const [newOrgUnitId, setNewOrgUnitId] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await transferEmployee.mutateAsync({
                eventDate: transferDate,
                orgUnitId: newOrgUnitId,
            })
            toast.success(t('common.success'))
            router.push(`/staff/employees/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <div className="p-6">{t('common.loading')}</div>
    if (!employee) return <div className="p-6">{t('common.noData')}</div>

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('employees.transfer')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="transferDate">{t('employees.transferDate')}</Label>
                            <Input
                                id="transferDate"
                                type="date"
                                value={transferDate}
                                onChange={(e) => setTransferDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="newOrgUnitId">{t('employees.newOrgUnit')}</Label>
                            <Select value={newOrgUnitId} onValueChange={setNewOrgUnitId}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('common.select')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {orgUnits?.map((unit: any) => (
                                        <SelectItem key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={transferEmployee.isPending}>
                                {transferEmployee.isPending ? t('common.saving') : t('employees.transfer')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                {t('common.cancel')}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
