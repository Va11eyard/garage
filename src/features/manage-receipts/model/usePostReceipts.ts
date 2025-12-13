'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function usePostReceipt() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ReceiptDocumentDto, Error, string>({
        mutationFn: (id: string) => service.post(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['receipts'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['receipts'], exact: false })
            router.refresh()
        },
    })
}
