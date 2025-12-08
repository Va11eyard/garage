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
            // Remove all cached item-groups queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['item-groups'] })
            queryClient.removeQueries({ queryKey: ['itemGroups'] })
            
            // Invalidate individual item-group queries
            queryClient.invalidateQueries({ queryKey: ['itemGroup'], exact: false })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['item-groups'], exact: false })
        },
    })
}
