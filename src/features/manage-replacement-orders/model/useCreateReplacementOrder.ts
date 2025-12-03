'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ReplacementOrderCreateRequest, type ReplacementOrderDto } from '@/shared/api/generated/__swagger_client'
import { ReplacementOrderService } from './service'

const service = new ReplacementOrderService()

export function useCreateReplacementOrder() {
    const queryClient = useQueryClient()

    return useMutation<ReplacementOrderDto, Error, ReplacementOrderCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['replacement-orders'] })
        },
    })
}
