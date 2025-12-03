'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type MovementDocumentCreateRequest, type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'
import { MoveItemsService } from './service'

const service = new MoveItemsService()

export function useMoveItems() {
    const queryClient = useQueryClient()

    return useMutation<MovementDocumentDto, Error, MovementDocumentCreateRequest>({
        mutationFn: (data: MovementDocumentCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movements'] })
            queryClient.invalidateQueries({ queryKey: ['stock'] })
        },
    })
}
