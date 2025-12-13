'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type QualityCategoryUpdateRequest, type QualityCategoryDto } from '@/shared/api/generated/__swagger_client'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useUpdateQualityCategory() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation<QualityCategoryDto, Error, { id: string; data: QualityCategoryUpdateRequest }>({
        mutationFn: ({ id, data }: { id: string; data: QualityCategoryUpdateRequest }) => service.update(id, data),
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ['quality-categories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['quality-categories'], exact: false })
            await queryClient.refetchQueries({ queryKey: ['qualityCategories'], type: 'active' })
            queryClient.invalidateQueries({ queryKey: ['qualityCategories'], exact: false })
            router.refresh()
        },
    })
}
