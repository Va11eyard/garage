'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type InventoryDocumentCreateRequest, type InventoryDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateInventory() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<InventoryDocumentDto, Error, InventoryDocumentCreateRequest>({
        mutationFn: (data: InventoryDocumentCreateRequest) => Service.createInventoryDocument(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventories'], exact: false })
            router.refresh()
        },
    })
}
