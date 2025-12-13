'use client'

import { useDismissEmployee } from '@/features/manage-employees/model/useDismissEmployee'
import { useEmployee } from '@/features/manage-employees/model/useEmployee'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function EmployeeDismissForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const { data: employee, isLoading } = useEmployee(id)
    const dismissEmployee = useDismissEmployee(id)
    const [dismissalDate, setDismissalDate] = useState('')
    const [reason, setReason] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await dismissEmployee.mutateAsync({
                dismissalDate,
                comment: reason,
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
                    <CardTitle>{t('employees.dismiss')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="dismissalDate">{t('employees.dismissalDate')}</Label>
                            <Input
                                id="dismissalDate"
                                type="date"
                                value={dismissalDate}
                                onChange={(e) => setDismissalDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="reason">{t('employees.dismissalReason')}</Label>
                            <Input
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={dismissEmployee.isPending}>
                                {dismissEmployee.isPending ? t('common.saving') : t('employees.dismiss')}
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
