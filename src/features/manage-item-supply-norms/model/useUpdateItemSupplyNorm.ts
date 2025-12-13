'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ItemSupplyNormService } from './service'
import type { ItemSupplyNormUpdateRequest } from '@/shared/api/generated/__swagger_client'

export function useUpdateItemSupplyNorm(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()
    const service = new ItemSupplyNormService()

    return useMutation({
        mutationFn: (data: ItemSupplyNormUpdateRequest) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-supply-norms'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['itemSupplyNorms'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['item-supply-norm', id], exact: false })
            router.refresh()
        },
    })
}
