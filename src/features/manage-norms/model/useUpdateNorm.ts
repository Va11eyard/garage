'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Service, type ProvisionNormUpdateRequest, type ProvisionNormDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateNorm(id: string) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<ProvisionNormDto, Error, ProvisionNormUpdateRequest>({
        mutationFn: (data: any) => Service.updateProvisionNorm(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['norms'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['norms'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['norms', id], exact: false })
            router.refresh()
        },
    })
}
