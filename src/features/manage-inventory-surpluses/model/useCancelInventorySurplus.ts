'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useCancelInventorySurplus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => Service.cancelInventorySurplusDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory-surpluses'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['inventory-surplus'], exact: false })
        },
    })
}
