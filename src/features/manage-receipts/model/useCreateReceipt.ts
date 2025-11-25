'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReceiptCreateRequest, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateReceipt() {
    const queryClient = useQueryClient()

    return useMutation<ReceiptDocumentDto, Error, ReceiptCreateRequest>({
        mutationFn: (data) => Service.create16(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'] })
        },
    })
}
