'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type InventorySurplusUpdateRequest, type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateInventorySurplus(id: string) {
    const queryClient = useQueryClient()

    return useMutation<InventorySurplusDocumentDto, Error, InventorySurplusUpdateRequest>({
        mutationFn: (data) => Service.update20(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'] })
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses', id] })
        },
    })
}
