'use client'
import { useUnit } from '@/features/manage-units/model/useUnit'
import { useUpdateUnit } from '@/features/manage-units/model/useUpdateUnit'
import { useForm } from 'react-hook-form'
import { UnitOfMeasureUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Spinner } from '@/shared/ui/spinner'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function UnitEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data, isLoading } = useUnit(id)
    const { mutateAsync } = useUpdateUnit()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<UnitOfMeasureUpdateRequest>({ defaultValues: data })
    const router = useRouter()
    if (isLoading) return <Spinner />

    const onSubmit = async (update: UnitOfMeasureUpdateRequest) => {
        try {
            await mutateAsync({ id, data: update })
            toast.success(t('common.success'))
            router.push(`/directories/units/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">{t('unitOfMeasure.editUnit')}</h2>
            <div>
                <Label>{t('unitOfMeasure.name')}</Label>
                <Input {...register('name', { required: true })} defaultValue={data?.name} />
            </div>
            <div>
                <Label>{t('unitOfMeasure.shortName')}</Label>
                <Input {...register('shortName')} defaultValue={data?.shortName} />
            </div>
            <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner /> : t('common.save')}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push('/directories/units')}>
                    {t('common.cancel')}
                </Button>
            </div>
        </form>
    )
}
