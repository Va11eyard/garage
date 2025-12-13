'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type ReturnCreateRequest, type ReturnDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReturnItemsService } from './service'

const service = new ReturnItemsService()

export function useReturnItems() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ReturnDocumentDto, Error, ReturnCreateRequest>({
        mutationFn: (data: ReturnCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['returns'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['assignments'], exact: false })
            router.refresh()
        },
    })
}
