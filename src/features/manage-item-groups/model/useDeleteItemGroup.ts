'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import { ItemGroupService } from "./service";
const service = new ItemGroupService();
export function useDeleteItemGroup() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            // Remove all cached item-groups queries to force fresh fetch
            queryClient.removeQueries({ queryKey: ['item-groups'] })
            queryClient.removeQueries({ queryKey: ['itemGroups'] })
            
            // Refetch active queries
            queryClient.refetchQueries({ queryKey: ['item-groups'], exact: false })
        },
    })
}
