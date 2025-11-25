'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WarehouseZoneUpdateRequest, type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateWarehouseZone() {
    const queryClient = useQueryClient()

    return useMutation<WarehouseZoneDto, Error, { id: string; data: WarehouseZoneUpdateRequest }>({
        mutationFn: ({ id, data }) => Service.update1(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouseZones'] })
        },
    })
}
