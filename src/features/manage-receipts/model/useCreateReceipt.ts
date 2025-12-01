'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ReceiptCreateRequest, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'

const service = new ReceiptService()

export function useCreateReceipt() {
    const queryClient = useQueryClient()

    return useMutation<ReceiptDocumentDto, Error, ReceiptCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'] })
        },
    })
}
