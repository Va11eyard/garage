'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'

export function usePostWriteOff() {
    const queryClient = useQueryClient()

    return useMutation<WriteOffDocumentDto, Error, string>({
        mutationFn: (id) => Service.post(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['writeOffs'] })
        },
    })
}
