'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type WarehouseCellUpdateRequest, type WarehouseCellDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useUpdateWarehouseCell() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<WarehouseCellDto, Error, { id: string; data: WarehouseCellUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: WarehouseCellUpdateRequest }) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['warehouse-cells'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouse-cells'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['warehouseCells'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouseCells'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['warehouseCell'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouseCell'], exact: false })
            router.refresh()
        },
    })
}
