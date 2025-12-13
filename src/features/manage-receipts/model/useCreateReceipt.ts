'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ReceiptCreateRequest, type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'

const service = new ReceiptService()

export function useCreateReceipt() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ReceiptDocumentDto, Error, ReceiptCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['receipts'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['receipts'], exact: false })
            router.refresh()
        },
    })
}
