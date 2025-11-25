'use client'

import { useWarehouseCell } from '@/features/manage-warehouse-cells/model/useWarehouseCell'
import { useUpdateWarehouseCell } from '@/features/manage-warehouse-cells/model/useUpdateWarehouseCell'
import { useWarehouses } from '@/features/manage-warehouses/model/useWarehouses'
import { useWarehouseZones } from '@/features/manage-warehouse-zones/model/useWarehouseZones'
import { useForm } from 'react-hook-form'
import { WarehouseCellUpdateRequest } from '@/shared/api/generated/__swagger_client'
import { useTranslation } from '@/shared/i18n/use-translation'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function WarehouseCellEditForm({ id }: { id: string }) {
    const { t } = useTranslation()
    const { data, isLoading } = useWarehouseCell(id)
    const { mutateAsync } = useUpdateWarehouseCell()
    const router = useRouter()
    const [warehouseId, setWarehouseId] = useState('')
    const { data: warehouses } = useWarehouses()
    const { data: zones } = useWarehouseZones(warehouseId)
    const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<WarehouseCellUpdateRequest>({ defaultValues: data })

    useEffect(() => {
        if (data?.warehouseId) {
            setWarehouseId(data.warehouseId)
        }
        if (data?.zoneId) {
            setValue('zoneId', data.zoneId)
        }
    }, [data, setValue])

    if (isLoading) return <Spinner />

    const onSubmit = async (update: WarehouseCellUpdateRequest) => {
        try {
            await mutateAsync({ id, data: update })
            toast.success(t('common.success'))
            router.push(`/directories/warehouse-cells/${id}`)
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">{t('warehouseCells.editCell')}</h2>
            <div>
                <Label>{t('warehouseCells.description')}</Label>
                <Input {...register('description')} defaultValue={data?.description} />
            </div>
            <div>
                <Label>{t('warehouseZones.title')}</Label>
                <select {...register('zoneId', { required: true })}
                        className="w-full border rounded px-3 py-2"
                        defaultValue={data?.zoneId}
                >
                    <option value="">{t('warehouseCells.zone')}</option>
                    {zones?.map((z: any) => (
                        <option key={z.id} value={z.id}>{z.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <Label>{t('warehouseCells.capacity')}</Label>
                <Input type="number" {...register('capacity', { valueAsNumber: true })} defaultValue={data?.capacity} />
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : t('common.save')}
            </Button>
        </form>
    )
}
