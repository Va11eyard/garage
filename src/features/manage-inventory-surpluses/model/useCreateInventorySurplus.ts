'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InventorySurplusCreateRequest, type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useCreateInventorySurplus() {
    const queryClient = useQueryClient()

    return useMutation<InventorySurplusDocumentDto, Error, InventorySurplusCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'], exact: false })
        },
    })
}
