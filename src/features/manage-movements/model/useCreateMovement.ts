'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type MovementDocumentCreateRequest, type MovementDocumentDto } from '@/shared/api/generated/__swagger_client'
import { MovementService } from './service'

const service = new MovementService()

export function useCreateMovement() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<MovementDocumentDto, Error, MovementDocumentCreateRequest>({
        mutationFn: (data: any) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['movements'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['movements'], exact: false })
            router.refresh()
        },
    })
}
