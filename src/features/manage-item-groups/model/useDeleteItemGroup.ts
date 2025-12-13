'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ItemGroupService } from "./service";
const service = new ItemGroupService();
export function useDeleteItemGroup() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['item-groups'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['item-groups'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['itemGroups'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['itemGroups'], exact: false })
            router.refresh()
        },
    })
}
