'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function useUnpostReceipt() {
    const queryClient = useQueryClient()

    return useMutation<ReceiptDocumentDto, Error, string>({
        mutationFn: (id: string) => service.unpost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receipts'], exact: false })
        },
    })
}
