'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReplacementOrderService } from './service'

const service = new ReplacementOrderService()

export function useDeleteReplacementOrder() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['replacement-orders'], exact: false })
        },
    })
}
