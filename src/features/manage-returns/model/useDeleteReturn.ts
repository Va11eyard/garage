'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

import { ReturnService } from './service'
const service = new ReturnService()

export function useDeleteReturn() {
    const queryClient = useQueryClient()

    return useMutation<any, Error, string>({
        mutationFn: (id) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
        },
    })
}
