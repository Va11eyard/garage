import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { ProvisionNormCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateProvisionNorm() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ProvisionNormCreateRequest) => Service.createProvisionNorm(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['provision-norms'], exact: false })
        },
    })
}
