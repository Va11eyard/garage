'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReturnCreateRequest, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

import { ReturnService } from './service'
const service = new ReturnService()

export function useCreateReturn() {
    const queryClient = useQueryClient()

    return useMutation<ReturnDocumentDto, Error, ReturnCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
        },
    })
}
