'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteInventory() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id) => Service.delete22(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventories'] })
        },
    })
}
