'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReceiptUpdateRequest, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateReceipt(id: string) {
    const queryClient = useQueryClient()

    return useMutation<ReceiptDocumentDto, Error, ReceiptUpdateRequest>({
        mutationFn: (data) => Service.update16(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'] })
            queryClient.invalidateQueries({ queryKey: ['receipts', id] })
        },
    })
}
