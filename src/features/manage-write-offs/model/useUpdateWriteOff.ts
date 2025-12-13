'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateWriteOff(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: any) => Service.updateWriteOffDocument(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['write-offs'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['writeOffs'], exact: false })
            router.refresh()
        },
    })
}
