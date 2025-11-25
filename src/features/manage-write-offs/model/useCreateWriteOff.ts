'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WriteOffCreateRequest, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateWriteOff() {
    const queryClient = useQueryClient()

    return useMutation<WriteOffDocumentDto, Error, WriteOffCreateRequest>({
        mutationFn: (data) => Service.create12(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['write-offs'] })
        },
    })
}
