'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useCancelInventorySurplus() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => Service.cancelInventorySurplusDocument(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['inventory-surpluses'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['inventory-surplus'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['inventory-surplus'], exact: false })
            router.refresh()
        },
    })
}
