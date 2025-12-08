'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type ProvisionNormUpdateRequest, type ProvisionNormDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateNorm(id: string) {
    const queryClient = useQueryClient()

    return useMutation<ProvisionNormDto, Error, ProvisionNormUpdateRequest>({
        mutationFn: (data: any) => Service.updateProvisionNorm(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['norms'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['norms', id], exact: false })
        },
    })
}
