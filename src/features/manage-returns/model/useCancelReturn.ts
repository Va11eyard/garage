'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCancelReturn() {
    const queryClient = useQueryClient()

    return useMutation<ReturnDocumentDto, Error, string>({
        mutationFn: (id) => Service.cancel2(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'] })
        },
    })
}
