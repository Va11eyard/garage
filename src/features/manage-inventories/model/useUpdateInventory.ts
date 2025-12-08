'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type InventoryDocumentUpdateRequest, type InventoryDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateInventory(id: string) {
    const queryClient = useQueryClient()

    return useMutation<InventoryDocumentDto, Error, InventoryDocumentUpdateRequest>({
        mutationFn: (data: any) => Service.updateInventoryDocument(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventories'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['inventories', id], exact: false })
        },
    })
}
