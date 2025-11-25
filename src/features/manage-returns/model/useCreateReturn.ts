'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReturnCreateRequest, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateReturn() {
    const queryClient = useQueryClient()

    return useMutation<ReturnDocumentDto, Error, ReturnCreateRequest>({
        mutationFn: (data) => Service.create14(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
        },
    })
}
