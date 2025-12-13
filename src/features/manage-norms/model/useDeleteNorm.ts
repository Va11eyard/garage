'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteNorm() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => Service.deleteItemSupplyNorm(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['norms'], exact: false })
            router.refresh()
        },
    })
}
