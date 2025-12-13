'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type WarehouseZoneUpdateRequest, type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useUpdateWarehouseZone() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<WarehouseZoneDto, Error, { id: string; data: WarehouseZoneUpdateRequest }>({
        mutationFn: ({ id, data }: any) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['warehouse-zones'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouse-zones'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['warehouseZones'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouseZones'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['warehouseZone'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouseZone'], exact: false })
            router.refresh()
        },
    })
}
