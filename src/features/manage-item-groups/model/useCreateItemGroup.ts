import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { ItemGroupCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateItemGroup() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ItemGroupCreateRequest) => Service.create10(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-groups'] })
        },
    })
}
