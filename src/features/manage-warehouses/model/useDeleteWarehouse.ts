'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteWarehouse() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => Service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'] })
        },
    })
}