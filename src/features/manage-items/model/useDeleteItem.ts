'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import {ItemService} from "./service";
const service = new ItemService();

export function useDeleteItem() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] })
        },
    })
}
