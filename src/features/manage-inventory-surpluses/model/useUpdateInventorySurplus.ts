'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InventorySurplusUpdateRequest, type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useUpdateInventorySurplus(id: string) {
    const queryClient = useQueryClient()

    return useMutation<InventorySurplusDocumentDto, Error, InventorySurplusUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'] })
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses', id] })
        },
    })
}
