'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type MovementDocumentCreateRequest, type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'
import { MoveItemsService } from './service'

const service = new MoveItemsService()

export function useMoveItems() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<MovementDocumentDto, Error, MovementDocumentCreateRequest>({
        mutationFn: (data: MovementDocumentCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movements'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['stock'], exact: false })
            router.refresh()
        },
    })
}
