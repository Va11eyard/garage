'use client'

import { useEmployeeCategory } from '@/features/manage-employee-categories/model/useEmployeeCategory'
import { useUpdateEmployeeCategory } from '@/features/manage-employee-categories/model/useUpdateEmployeeCategory'
import { useForm } from 'react-hook-form'
import { EmployeeCategoryUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Checkbox } from '@/shared/ui/checkbox'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function EmployeeCategoryEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data: category, isLoading } = useEmployeeCategory(id)
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<EmployeeCategoryUpdateRequest>()
    const { mutateAsync } = useUpdateEmployeeCategory()
    const router = useRouter()

    const active = watch('active')

    useEffect(() => {
        if (category) {
            setValue('name', category.name)
            setValue('description', category.description || '')
            setValue('active', category.active ?? true)
        }
    }, [category, setValue])

    const onSubmit = async (data: EmployeeCategoryUpdateRequest) => {
        try {
            await mutateAsync({ id, data })
            toast.success(t('common.success'))
            router.push(`/directories/employee-categories/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    if (isLoading) return <div>{t('common.loading')}</div>

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold">{t('employeeCategories.editCategory')}</h2>
            
            <div>
                <Label>{t('employeeCategories.name')}</Label>
                <Input {...register('name', { required: true })} />
                {errors.name && <span className="text-red-600 text-sm">{t('common.error')}</span>}
            </div>

            <div>
                <Label>{t('employeeCategories.description')}</Label>
                <Textarea {...register('description')} />
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="active"
                    checked={active}
                    onCheckedChange={(checked) => setValue('active', checked as boolean)}
                />
                <Label htmlFor="active">{t('common.active')}</Label>
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('common.loading') : t('common.save')}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    {t('common.cancel')}
                </Button>
            </div>
        </form>
    )
}
