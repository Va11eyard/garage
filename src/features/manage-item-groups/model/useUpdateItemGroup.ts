'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ItemGroupUpdateRequest, type ItemGroupDto } from '@/shared/api/generated/__swagger_client'
import { ItemGroupService } from "./service";
const service = new ItemGroupService();
export function useUpdateItemGroup() {
    const queryClient = useQueryClient()

    return useMutation<ItemGroupDto, Error, { id: string; data: ItemGroupUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: ItemGroupUpdateRequest }) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-groups'] })
            queryClient.invalidateQueries({ queryKey: ['itemGroups'] })
            queryClient.invalidateQueries({ queryKey: ['itemGroup'] })
        },
    })
}
