'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type InventorySurplusCreateRequest, type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateInventorySurplus() {
    const queryClient = useQueryClient()

    return useMutation<InventorySurplusDocumentDto, Error, InventorySurplusCreateRequest>({
        mutationFn: (data) => Service.create20(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'] })
        },
    })
}
