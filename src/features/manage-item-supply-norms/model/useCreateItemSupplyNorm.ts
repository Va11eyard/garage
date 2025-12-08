import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ItemSupplyNormService } from './service'
import type { ItemSupplyNormCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateItemSupplyNorm() {
    const queryClient = useQueryClient()
    const service = new ItemSupplyNormService()

    return useMutation({
        mutationFn: (data: ItemSupplyNormCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-supply-norms'] })
            queryClient.invalidateQueries({ queryKey: ['itemSupplyNorms'] })
        },
    })
}
