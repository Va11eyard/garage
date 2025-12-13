'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ReplacementOrderCreateRequest, type ReplacementOrderDto } from '@/shared/api/generated/__swagger_client'
import { ReplacementOrderService } from './service'

const service = new ReplacementOrderService()

export function useCreateReplacementOrder() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ReplacementOrderDto, Error, ReplacementOrderCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['replacement-orders'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['replacement-orders'], exact: false })
            router.refresh()
        },
    })
}
