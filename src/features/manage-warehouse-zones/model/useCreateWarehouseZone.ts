'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type WarehouseZoneCreateRequest, type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useCreateWarehouseZone() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: WarehouseZoneCreateRequest) => service.create(data),
        onSuccess: () => {
            // Remove all cached warehouse-zones queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['warehouse-zones'] })
            queryClient.removeQueries({ queryKey: ['warehouseZones'] })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['warehouse-zones'], exact: false })
        },
    })
}
