'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ItemSupplyNormService } from './service'
import type { ItemSupplyNormCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateItemSupplyNorm() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const service = new ItemSupplyNormService()

    return useMutation({
        mutationFn: (data: ItemSupplyNormCreateRequest) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['item-supply-norms'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['item-supply-norms'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['itemSupplyNorms'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['itemSupplyNorms'], exact: false })
            router.refresh()
        },
    })
}
