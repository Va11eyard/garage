'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ReplacementOrderUpdateRequest, type ReplacementOrderDto } from '@/shared/api/generated/__swagger_client'
import { ReplacementOrderService } from './service'

const service = new ReplacementOrderService()

export function useUpdateReplacementOrder(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ReplacementOrderDto, Error, ReplacementOrderUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['replacement-orders'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['replacement-orders', id], exact: false })
            router.refresh()
        },
    })
}
