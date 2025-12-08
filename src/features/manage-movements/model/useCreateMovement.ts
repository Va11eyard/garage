'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type MovementDocumentCreateRequest, type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'
import { MovementService } from './service'

const service = new MovementService()

export function useCreateMovement() {
    const queryClient = useQueryClient()

    return useMutation<MovementDocumentDto, Error, MovementDocumentCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movements'], exact: false })
        },
    })
}
