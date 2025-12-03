'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useDeleteQualityCategory() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qualityCategories'] })
        },
    })
}
