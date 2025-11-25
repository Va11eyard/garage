'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service, type QualityCategoryUpdateRequest, type QualityCategoryDto } from '@/shared/api/generated/__swagger_client'

export function useUpdateQualityCategory() {
    const queryClient = useQueryClient()

    return useMutation<QualityCategoryDto, Error, { id: string; data: QualityCategoryUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: QualityCategoryUpdateRequest }) => Service.update4(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qualityCategories'] })
        },
    })
}
