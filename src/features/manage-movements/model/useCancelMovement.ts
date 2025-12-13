'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useCancelMovement() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (id: string) => Service.cancelMovementDocument(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['movements'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['movements'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['movement'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['movement'], exact: false })
            router.refresh()
        },
    })
}
