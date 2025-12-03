'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useCancelInventorySurplus() {
    const queryClient = useQueryClient()

    return useMutation<InventorySurplusDocumentDto, Error, string>({
        mutationFn: (id: string) => service.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventorySurpluses'] })
        },
    })
}
