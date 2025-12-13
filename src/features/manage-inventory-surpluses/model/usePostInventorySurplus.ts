'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePostInventorySurplus() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => Service.postInventorySurplusDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['inventory-surplus'], exact: false })
            router.refresh()
        },
    })
}
