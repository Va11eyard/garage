'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReturnService } from './service'

const service = new ReturnService()

export function usePostReturn() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
        },
    })
}
