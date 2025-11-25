'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type InventoryDocumentUpdateRequest, type InventoryDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateInventory(id: string) {
    const queryClient = useQueryClient()

    return useMutation<InventoryDocumentDto, Error, InventoryDocumentUpdateRequest>({
        mutationFn: (data) => Service.update21(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventories'] })
            queryClient.invalidateQueries({ queryKey: ['inventories', id] })
        },
    })
}
