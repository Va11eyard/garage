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
            // Remove all cached warehouse-zones queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['warehouse-zones'] })
            queryClient.removeQueries({ queryKey: ['warehouseZones'] })
            
            // Invalidate individual warehouse-zone queries
            queryClient.invalidateQueries({ queryKey: ['warehouseZone'], exact: false })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['warehouse-zones'], exact: false })
        },
    })
}
