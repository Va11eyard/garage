'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateReturn(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: any) => Service.updateReturnDocument(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['returns', id], exact: false })
            router.refresh()
        },
    })
}
