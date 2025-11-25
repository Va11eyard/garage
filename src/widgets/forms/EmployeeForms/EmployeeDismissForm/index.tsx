'use client'

import { useEmployee } from '@/features/manage-employees/model/useEmployee'
import { useDismissEmployee } from '@/features/manage-employees/model/useDismissEmployee'
import { useForm } from 'react-hook-form'
import { EmployeeDismissRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function EmployeeDismissForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: employee, isLoading } = useEmployee(id)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EmployeeDismissRequest>()
    const { mutateAsync } = useDismissEmployee(id)
    const router = useRouter()

    const onSubmit = async (data: EmployeeDismissRequest) => {
        if (!confirm(t('employees.dismissEmployee') + '?')) return
        
        try {
            await mutateAsync(data)
            toast.success(t('common.success'))
            router.push(`/staff/employees/${id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>
    if (employee?.status !== 'ACTIVE') {
        return <div className="p-6">Можно уволить только активного сотрудника</div>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold">{t('employees.dismissEmployee')}</h2>
            
            <div>
                <Label>{t('employees.dismissDate')}</Label>
                <Input type="date" {...register('dismissalDate', { required: true })} />
                {errors.dismissalDate && <span className="text-red-600 text-sm">{t('common.error')}</span>}
            </div>

            <div>
                <Label>Комментарий</Label>
                <Textarea {...register('comment')} />
            </div>

            <div className="flex gap-2">
                <Button type="submit" variant="destructive" disabled={isSubmitting}>
                    {isSubmitting ? t('common.loading') : t('employees.dismissEmployee')}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    {t('common.cancel')}
                </Button>
            </div>
        </form>
    )
}
