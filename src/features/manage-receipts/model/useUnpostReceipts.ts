'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUnpostReceipt() {
    const queryClient = useQueryClient()

    return useMutation<ReceiptDocumentDto, Error, string>({
        mutationFn: (id) => Service.unpost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'] })
        },
    })
}
