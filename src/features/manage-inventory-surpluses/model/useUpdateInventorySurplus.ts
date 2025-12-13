'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type InventorySurplusUpdateRequest, type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useUpdateInventorySurplus(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<InventorySurplusDocumentDto, Error, InventorySurplusUpdateRequest>({
        mutationFn: (data: any) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses', id], exact: false })
            router.refresh()
        },
    })
}
