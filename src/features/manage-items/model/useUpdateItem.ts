'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ItemUpdateRequest, type ItemDto } from '@/shared/api/generated/__swagger_client'
import {ItemService} from "./service";
const service = new ItemService();

export function useUpdateItem() {
    const queryClient = useQueryClient()

    return useMutation<ItemDto, Error, { id: string; data: ItemUpdateRequest }>({
        mutationFn: ({ id, data }) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] })
        },
    })
}
