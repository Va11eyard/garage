'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type WarehouseZoneCreateRequest, type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useCreateWarehouseZone() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: WarehouseZoneCreateRequest) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['warehouse-zones'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouse-zones'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['warehouseZones'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouseZones'], exact: false })
            router.refresh()
        },
    })
}
