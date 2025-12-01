'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReplacementOrderUpdateRequest, type ReplacementOrderDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateReplacementOrder(id: string) {
    const queryClient = useQueryClient()

    return useMutation<ReplacementOrderDto, Error, ReplacementOrderUpdateRequest>({
        mutationFn: (data: any) => Service.update16(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['replacement-orders'] })
            queryClient.invalidateQueries({ queryKey: ['replacement-orders', id] })
        },
    })
}
