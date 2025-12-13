'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateReceipt(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: any) => Service.updateReceiptDocument(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['receipts'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['receipts'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['receipts', id], exact: false })
            router.refresh()
        },
    })
}
