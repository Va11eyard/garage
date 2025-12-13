'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useUpdateMovement(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: any) => Service.updateMovementDocument(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['movements'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['movements'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['movements', id], exact: false })
            router.refresh()
        },
    })
}
