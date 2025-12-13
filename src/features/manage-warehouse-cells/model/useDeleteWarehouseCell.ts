'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useDeleteWarehouseCell() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouse-cells'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['warehouseCells'], exact: false })
            router.refresh()
        },
    })
}
