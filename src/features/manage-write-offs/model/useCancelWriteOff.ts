'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCancelWriteOff() {
    const queryClient = useQueryClient()

    return useMutation<WriteOffDocumentDto, Error, string>({
        mutationFn: (id) => Service.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['writeOffs'] })
        },
    })
}
