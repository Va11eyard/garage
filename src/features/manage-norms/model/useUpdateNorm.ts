'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ItemSupplyNormUpdateRequest, type ItemSupplyNormDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateNorm(id: string) {
    const queryClient = useQueryClient()

    return useMutation<ItemSupplyNormDto, Error, ItemSupplyNormUpdateRequest>({
        mutationFn: (data: any) => Service.updateItemSupplyNorm(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['norms'] })
            queryClient.invalidateQueries({ queryKey: ['norms', id] })
        },
    })
}
