'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type InventorySurplusCreateRequest, type InventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useCreateInventorySurplus() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<InventorySurplusDocumentDto, Error, InventorySurplusCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['inventory-surpluses'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'], exact: false })
            router.refresh()
        },
    })
}
