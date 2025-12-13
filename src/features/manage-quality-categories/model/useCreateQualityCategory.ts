'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { QualityCategoryCreateRequest } from '@/shared/api/generated/__swagger_client'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useCreateQualityCategory() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (data: QualityCategoryCreateRequest) => service.create(data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['quality-categories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['quality-categories'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['qualityCategories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['qualityCategories'], exact: false })
            router.refresh()
        },
    })
}
