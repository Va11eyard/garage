'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type WarehouseCellUpdateRequest, type WarehouseCellDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useUpdateWarehouseCell() {
    const queryClient = useQueryClient()

    return useMutation<WarehouseCellDto, Error, { id: string; data: WarehouseCellUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: WarehouseCellUpdateRequest }) => service.update(id, data),
        onSuccess: () => {
            // Remove all cached warehouse-cells queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['warehouse-cells'] })
            queryClient.removeQueries({ queryKey: ['warehouseCells'] })
            
            // Invalidate individual warehouse-cell queries
            queryClient.invalidateQueries({ queryKey: ['warehouseCell'], exact: false })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['warehouse-cells'], exact: false })
        },
    })
}
