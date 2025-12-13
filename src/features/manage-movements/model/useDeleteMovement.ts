'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MovementService } from './service'

const service = new MovementService()

export function useDeleteMovement() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.delete(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['movements'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['movements'], exact: false })
            router.refresh()
        },
    })
}
