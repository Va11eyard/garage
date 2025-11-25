'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ItemGroupUpdateRequest, type ItemGroupDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateItemGroup() {
    const queryClient = useQueryClient()

    return useMutation<ItemGroupDto, Error, { id: string; data: ItemGroupUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: ItemGroupUpdateRequest }) => Service.update8(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['itemGroups'] })
            queryClient.invalidateQueries({ queryKey: ['itemGroup'] })
        },
    })
}
