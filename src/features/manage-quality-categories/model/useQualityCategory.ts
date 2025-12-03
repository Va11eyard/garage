'use client'

import { useQuery } from '@tanstack/react-query'
import { type QualityCategoryDto } from '@/shared/api/generated/__swagger_client'
import { QualityCategoryService } from './service'

const service = new QualityCategoryService()

export function useQualityCategory(id?: string) {
    return useQuery<QualityCategoryDto, Error>({
        queryKey: ['qualityCategories', id],
        queryFn: () => service.get(id!),
        enabled: !!id,
    })
}
