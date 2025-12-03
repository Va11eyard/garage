'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type WriteOffCreateRequest, type WriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'
import { WriteOffService } from './service'

const service = new WriteOffService()

export function useCreateWriteOff() {
    const queryClient = useQueryClient()

    return useMutation<WriteOffDocumentDto, Error, WriteOffCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['write-offs'] })
        },
    })
}
