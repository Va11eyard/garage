'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useDeleteQualityCategory() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => service.remove(id),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['quality-categories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['quality-categories'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['qualityCategories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['qualityCategories'], exact: false })
            router.refresh()
        },
    })
}
