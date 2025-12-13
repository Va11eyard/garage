'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { ProvisionNormCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateProvisionNorm() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: ProvisionNormCreateRequest) => Service.createProvisionNorm(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provision-norms'], exact: false })
            router.refresh()
        },
    })
}
