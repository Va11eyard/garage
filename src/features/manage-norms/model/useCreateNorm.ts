'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ItemSupplyNormCreateRequest, type ItemSupplyNormDto } from '@/shared/api/generated/__swagger_client'

export function useCreateNorm() {
    const queryClient = useQueryClient()

    return useMutation<ItemSupplyNormDto, Error, ItemSupplyNormCreateRequest>({
        mutationFn: (data) => Service.create8(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['norms'] })
        },
    })
}
