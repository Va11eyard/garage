'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useGeneratePurchasePlan() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (request: any) => Service.generate(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchase-plans'], exact: false })
            router.refresh()
        },
    })
}
