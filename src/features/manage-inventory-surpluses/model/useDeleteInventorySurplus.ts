'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useDeleteInventorySurplus() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'] })
        },
    })
}
