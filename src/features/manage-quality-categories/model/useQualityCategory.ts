'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type QualityCategoryDto } from '@/shared/api/generated/__swagger_client'

export function useQualityCategory(id?: string) {
    return useQuery<QualityCategoryDto, Error>({
        queryKey: ['qualityCategories', id],
        queryFn: () => Service.get4(id!),
        enabled: !!id,
    })
}
