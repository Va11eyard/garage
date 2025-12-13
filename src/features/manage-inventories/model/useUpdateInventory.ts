'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type InventoryDocumentUpdateRequest, type InventoryDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateInventory(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<InventoryDocumentDto, Error, InventoryDocumentUpdateRequest>({
        mutationFn: (data: any) => Service.updateInventoryDocument(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventories'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['inventories', id], exact: false })
            router.refresh()
        },
    })
}
