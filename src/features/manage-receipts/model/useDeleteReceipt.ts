'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function useDeleteReceipt() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['receipts'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['receipts'], exact: false })
            router.refresh()
        },
    })
}
