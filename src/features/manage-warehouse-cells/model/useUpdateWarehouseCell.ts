'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WarehouseCellUpdateRequest, type WarehouseCellDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateWarehouseCell() {
    const queryClient = useQueryClient()

    return useMutation<WarehouseCellDto, Error, { id: string; data: WarehouseCellUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: WarehouseCellUpdateRequest }) => Service.update9(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouseCells'] })
            queryClient.invalidateQueries({ queryKey: ['warehouseCell'] })
        },
    })
}
