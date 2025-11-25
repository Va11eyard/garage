'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReturnUpdateRequest, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateReturn(id: string) {
    const queryClient = useQueryClient()

    return useMutation<ReturnDocumentDto, Error, ReturnUpdateRequest>({
        mutationFn: (data) => Service.update14(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
            queryClient.invalidateQueries({ queryKey: ['returns', id] })
        },
    })
}
