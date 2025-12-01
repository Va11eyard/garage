'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type InventoryDocumentCreateRequest, type InventoryDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateInventory() {
    const queryClient = useQueryClient()

    return useMutation<InventoryDocumentDto, Error, InventoryDocumentCreateRequest>({
        mutationFn: (data: InventoryDocumentCreateRequest) => Service.create25(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventories'] })
        },
    })
}
