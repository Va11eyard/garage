'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateMovement(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: any) => Service.updateMovementDocument(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movements'] })
            queryClient.invalidateQueries({ queryKey: ['movements', id] })
        },
    })
}
