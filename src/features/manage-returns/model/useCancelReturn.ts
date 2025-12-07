'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReturnService } from './service'

const service = new ReturnService()

export function useCancelReturn() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => service.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
        },
    })
}
