'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ItemCreateRequest, type ItemDto } from '@/shared/api/generated/__swagger_client'
import {ItemService} from "./service";
const service = new ItemService();

export function useCreateItem() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ItemDto, Error, ItemCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['items'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['items'], exact: false })
            router.refresh()
        },
    })
}
