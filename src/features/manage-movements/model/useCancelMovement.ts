'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useCancelMovement() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => Service.cancelMovementDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movements'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['movement'], exact: false })
        },
    })
}
