'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export function usePostReceipt() {
    const queryClient = useQueryClient()

    return useMutation<ReceiptDocumentDto, Error, string>({
        mutationFn: (id) => Service.post4(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'] })
        },
    })
}
