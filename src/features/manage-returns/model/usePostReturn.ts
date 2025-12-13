'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ReturnService } from './service'

const service = new ReturnService()

export function usePostReturn() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'], exact: false })
            router.refresh()
        },
    })
}
