'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

import { ReturnService } from './service'
const service = new ReturnService()

export function usePostReturn() {
    const queryClient = useQueryClient()

    return useMutation<ReturnDocumentDto, Error, string>({
        mutationFn: (id: string) => service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
        },
    })
}
