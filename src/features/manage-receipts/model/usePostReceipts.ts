'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function usePostReceipt() {
    const queryClient = useQueryClient()

    return useMutation<ReceiptDocumentDto, Error, string>({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'], exact: false })
        },
    })
}
