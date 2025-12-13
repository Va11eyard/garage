'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ReplacementOrderService } from './service'

const service = new ReplacementOrderService()

export function useDeleteReplacementOrder() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['replacement-orders'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['replacement-orders'], exact: false })
            router.refresh()
        },
    })
}
