'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useDeleteQualityCategory() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => Service.delete4(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['qualityCategories'] })
        },
    })
}
