'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { UnitOfMeasureCreateRequest } from '@/shared/api/generated/__swagger_client'
import { UnitOfMeasureService } from './service'

const service = new UnitOfMeasureService()

export function useCreateUnit() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: UnitOfMeasureCreateRequest) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['units'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['units'], exact: false })
            router.refresh()
        },
    })
}
