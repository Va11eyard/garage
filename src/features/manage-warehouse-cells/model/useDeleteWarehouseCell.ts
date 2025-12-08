'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useDeleteWarehouseCell() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            // Remove all cached warehouse-cells queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['warehouse-cells'] })
            queryClient.removeQueries({ queryKey: ['warehouseCells'] })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['warehouse-cells'], exact: false })
        },
    })
}
