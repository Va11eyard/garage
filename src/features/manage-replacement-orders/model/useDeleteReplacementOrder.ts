'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteReplacementOrder() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id) => Service.delete16(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['replacement-orders'] })
        },
    })
}
