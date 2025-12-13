'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type ItemSupplyNormCreateRequest, type ItemSupplyNormDto } from '@/shared/api/generated/__swagger_client'

export function useCreateNorm() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ItemSupplyNormDto, Error, ItemSupplyNormCreateRequest>({
        mutationFn: (data: any) => Service.createItemSupplyNorm(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['norms'], exact: false })
            router.refresh()
        },
    })
}
