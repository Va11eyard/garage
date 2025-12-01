'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type MovementDocumentUpdateRequest, type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateMovement(id: string) {
    const queryClient = useQueryClient()

    return useMutation<MovementDocumentDto, Error, MovementDocumentUpdateRequest>({
        mutationFn: (data: any) => Service.update19(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movements'] })
            queryClient.invalidateQueries({ queryKey: ['movements', id] })
        },
    })
}
