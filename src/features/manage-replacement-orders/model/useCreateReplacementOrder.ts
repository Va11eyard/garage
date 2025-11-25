'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReplacementOrderCreateRequest, type ReplacementOrderDto } from '@/shared/api/generated/__swagger_client'

export function useCreateReplacementOrder() {
    const queryClient = useQueryClient()

    return useMutation<ReplacementOrderDto, Error, ReplacementOrderCreateRequest>({
        mutationFn: (data) => Service.create14(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['replacement-orders'] })
        },
    })
}
