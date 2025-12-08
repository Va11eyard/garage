'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type WarehouseCellCreateRequest, type WarehouseCellDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useCreateWarehouseCell() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: WarehouseCellCreateRequest) => service.create(data),
        onSuccess: () => {
            // Remove all cached warehouse-cells queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['warehouse-cells'] })
            queryClient.removeQueries({ queryKey: ['warehouseCells'] })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['warehouse-cells'], exact: false })
        },
    })
}
