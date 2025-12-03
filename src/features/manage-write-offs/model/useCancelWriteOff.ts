'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'
import { WriteOffService } from './service'

const service = new WriteOffService()

export function useCancelWriteOff() {
    const queryClient = useQueryClient()

    return useMutation<WriteOffDocumentDto, Error, string>({
        mutationFn: (id: string) => service.cancel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['writeOffs'] })
        },
    })
}
