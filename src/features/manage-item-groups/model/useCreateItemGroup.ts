'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { ItemGroupCreateRequest } from '@/shared/api/generated/__swagger_client'
import { ItemGroupService } from "./service";
const service = new ItemGroupService();

export function useCreateItemGroup() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: ItemGroupCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['item-groups'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['itemGroups'], exact: false })
            router.refresh()
        },
    })
}
