'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MovementService } from './service'

const service = new MovementService()

export function useDeleteMovement() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['movements'] })
        },
    })
}
