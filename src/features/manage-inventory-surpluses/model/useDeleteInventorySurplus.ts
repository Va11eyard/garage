'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useDeleteInventorySurplus() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['inventory-surpluses'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'], exact: false })
            router.refresh()
        },
    })
}
