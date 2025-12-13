'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ItemSupplyNormService } from './service'

export function useDeleteItemSupplyNorm() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const service = new ItemSupplyNormService()

    return useMutation({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-supply-norms'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['itemSupplyNorms'], exact: false })
            router.refresh()
        },
    })
}
