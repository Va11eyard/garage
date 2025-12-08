'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type QualityCategoryUpdateRequest, type QualityCategoryDto } from '@/shared/api/generated/__swagger_client'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useUpdateQualityCategory() {
    const queryClient = useQueryClient()

    return useMutation<QualityCategoryDto, Error, { id: string; data: QualityCategoryUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: QualityCategoryUpdateRequest }) => service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-categories'] })
            queryClient.invalidateQueries({ queryKey: ['qualityCategories'] })
        },
    })
}
