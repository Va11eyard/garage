'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ItemCreateRequest, type ItemDto } from '@/shared/api/generated/__swagger_client'

export function useCreateItem() {
    const queryClient = useQueryClient()

    return useMutation<ItemDto, Error, ItemCreateRequest>({
        mutationFn: (data) => Service.create7(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] })
        },
    })
}
