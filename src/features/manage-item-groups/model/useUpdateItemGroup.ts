'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ItemGroupUpdateRequest, type ItemGroupDto } from '@/shared/api/generated/__swagger_client'
import { ItemGroupService } from "./service";
const service = new ItemGroupService();
export function useUpdateItemGroup() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ItemGroupDto, Error, { id: string; data: ItemGroupUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: ItemGroupUpdateRequest }) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['item-groups'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['item-groups'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['itemGroups'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['itemGroups'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['itemGroup'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['itemGroup'], exact: false })
            router.refresh()
        },
    })
}
