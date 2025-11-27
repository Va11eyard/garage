'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'

export function usePostInventorySurplus() {
    const queryClient = useQueryClient()

    return useMutation<InventorySurplusDocumentDto, Error, string>({
        mutationFn: (id) => Service.post11(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventorySurpluses'] })
        },
    })
}
