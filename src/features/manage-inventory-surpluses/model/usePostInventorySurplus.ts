'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePostInventorySurplus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => Service.postInventorySurplusDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'] })
            queryClient.invalidateQueries({ queryKey: ['inventory-surplus'] })
        },
    })
}
