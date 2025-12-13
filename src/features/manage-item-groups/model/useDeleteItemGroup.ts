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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-groups'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['itemGroups'], exact: false })
            router.refresh()
        },
    })
}
