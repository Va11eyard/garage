import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'
import type { QualityCategoryCreateRequest } from '@/shared/api/generated/__swagger_client'

export function useCreateQualityCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: QualityCategoryCreateRequest) => Service.create5(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-categories'] })
        },
    })
}
