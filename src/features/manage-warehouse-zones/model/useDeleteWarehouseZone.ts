'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useDeleteWarehouseZone() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            // Remove all cached warehouse-zones queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['warehouse-zones'] })
            queryClient.removeQueries({ queryKey: ['warehouseZones'] })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['warehouse-zones'], exact: false })
        },
    })
}
