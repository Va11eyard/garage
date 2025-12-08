import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ItemSupplyNormService } from './service'
import type { ItemSupplyNormUpdateRequest } from '@/shared/api/generated/__swagger_client'

export function useUpdateItemSupplyNorm(id: string) {
    const queryClient = useQueryClient()
    const service = new ItemSupplyNormService()

    return useMutation({
        mutationFn: (data: ItemSupplyNormUpdateRequest) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-supply-norms'] })
            queryClient.invalidateQueries({ queryKey: ['itemSupplyNorms'] })
            queryClient.invalidateQueries({ queryKey: ['item-supply-norm', id] })
        },
    })
}
