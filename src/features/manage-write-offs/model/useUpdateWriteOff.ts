'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateWriteOff(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: any) => Service.updateWriteOffDocument(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['write-offs'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['write-offs'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['writeOffs'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['writeOffs'], exact: false })
            router.refresh()
        },
    })
}
