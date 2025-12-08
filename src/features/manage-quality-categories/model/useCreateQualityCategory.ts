import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { QualityCategoryCreateRequest } from '@/shared/api/generated/__swagger_client'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useCreateQualityCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: QualityCategoryCreateRequest) => service.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-categories'], exact: false })
            queryClient.invalidateQueries({ queryKey: ['qualityCategories'], exact: false })
        },
    })
}
