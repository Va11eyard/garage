'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateReturn(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: any) => Service.updateReturnDocument(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
            queryClient.invalidateQueries({ queryKey: ['returns', id] })
        },
    })
}
