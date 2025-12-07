'use client'

import { useOrganization } from '@/features/manage-organizations/model/useOrganization'
import { useUpdateOrganization } from '@/features/manage-organizations/model/useUpdateOrganization'
import { useTranslation } from '@/shared/i18n/use-translation'
import { useForm } from 'react-hook-form'
import { OrganizationUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/shared/ui/spinner'
import { getErrorMessage } from '@/shared/utils/error-handler'

export function OrganizationEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data, isLoading } = useOrganization(id)
    const { mutateAsync } = useUpdateOrganization()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<OrganizationUpdateRequest>({ defaultValues: data })
    const router = useRouter()

    if (isLoading) return <Spinner />

    const onSubmit = async (update: OrganizationUpdateRequest) => {
        try {
            await mutateAsync({ id, data: update })
            toast.success(t('common.success'))
            router.push(`/directories/organizations/${id}`)
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">{t('organizations.editOrganization')}</h2>
            <div>
                <Label>{t('organizations.name')}</Label>
                <Input {...register('name', { required: true })} defaultValue={data?.name} />
            </div>

            <div>
                <Label>{t('organizations.shortName')}</Label>
                <Input {...register('shortName')} defaultValue={data?.shortName} />
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : t('common.save')}
            </Button>
        </form>
    )
}
