'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ReturnService } from './service'

const service = new ReturnService()

export function useCancelReturn() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => service.cancel(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['returns'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['returns'], exact: false })
            router.refresh()
        },
    })
}
