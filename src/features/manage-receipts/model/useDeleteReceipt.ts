'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function useDeleteReceipt() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'], exact: false })
        },
    })
}
