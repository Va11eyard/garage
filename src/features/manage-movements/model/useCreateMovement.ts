'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type MovementDocumentCreateRequest, type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useCreateMovement() {
    const queryClient = useQueryClient()

    return useMutation<MovementDocumentDto, Error, MovementDocumentCreateRequest>({
        mutationFn: (data: any) => Service.create22(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movements'] })
        },
    })
}
