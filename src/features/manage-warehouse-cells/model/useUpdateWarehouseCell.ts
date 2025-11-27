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
            queryClient.invalidateQueries({ queryKey: ['warehouseCells'] })
            queryClient.invalidateQueries({ queryKey: ['warehouseCell'] })
        },
    })
}
