'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {ItemService} from "./service";
const service = new ItemService();

export function useDeleteItem() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['items'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['items'], exact: false })
            router.refresh()
        },
    })
}
