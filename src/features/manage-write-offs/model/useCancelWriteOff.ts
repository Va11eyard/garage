'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useCancelWriteOff() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => Service.cancelWriteOffDocument(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['write-offs'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['write-offs'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['writeOffs'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['writeOffs'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['write-off'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['write-off'], exact: false })
            router.refresh()
        },
    })
}
