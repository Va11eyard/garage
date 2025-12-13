'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ItemUpdateRequest, type ItemDto } from '@/shared/api/generated/__swagger_client'
import {ItemService} from "./service";
const service = new ItemService();

export function useUpdateItem() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ItemDto, Error, { id: string; data: ItemUpdateRequest }>({
        mutationFn: ({ id, data }: any) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['items'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['items'], exact: false })
            router.refresh()
        },
    })
}
