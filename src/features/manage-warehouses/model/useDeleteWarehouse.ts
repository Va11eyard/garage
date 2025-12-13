'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WarehouseService } from './service'

const service = new WarehouseService()

export function useDeleteWarehouse() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['warehouses'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['warehouses'], exact: false })
        },
    })
}