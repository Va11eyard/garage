'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type WarehouseZoneUpdateRequest, type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useUpdateWarehouseZone() {
    const queryClient = useQueryClient()

    return useMutation<WarehouseZoneDto, Error, { id: string; data: WarehouseZoneUpdateRequest }>({
        mutationFn: ({ id, data }: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouse-zones'] })
            queryClient.invalidateQueries({ queryKey: ['warehouseZones'] })
        },
    })
}
