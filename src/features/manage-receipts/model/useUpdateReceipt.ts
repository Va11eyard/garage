'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateReceipt(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: any) => Service.updateReceiptDocument(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['receipts', id], exact: false })
        },
    })
}
