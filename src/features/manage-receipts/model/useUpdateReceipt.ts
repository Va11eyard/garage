'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReceiptUpdateRequest, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function useUpdateReceipt(id: string) {
    const queryClient = useQueryClient()

    return useMutation<ReceiptDocumentDto, Error, ReceiptUpdateRequest>({
        mutationFn: (data) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'] })
            queryClient.invalidateQueries({ queryKey: ['receipts', id] })
        },
    })
}
