'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ItemCreateRequest, type ItemDto } from '@/shared/api/generated/__swagger_client'

import {ItemService} from "./service";
const service = new ItemService();

export function useCreateItem() {
    const queryClient = useQueryClient()

    return useMutation<ItemDto, Error, ItemCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'], exact: false })
        },
    })
}
