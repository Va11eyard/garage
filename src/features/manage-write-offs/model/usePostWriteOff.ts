'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function usePostWriteOff() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => Service.postWriteOffDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['write-offs'] })
            queryClient.invalidateQueries({ queryKey: ['writeOffs'] })
            queryClient.invalidateQueries({ queryKey: ['write-off'] })
        },
    })
}
