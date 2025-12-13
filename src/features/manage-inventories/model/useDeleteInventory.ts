'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteInventory() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => Service.deleteInventoryDocument(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['inventories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['inventories'], exact: false })
            router.refresh()
        },
    })
}
