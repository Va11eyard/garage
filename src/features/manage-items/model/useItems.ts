'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageItemDto } from '@/shared/api/generated/__swagger_client'

export function useItems(params: {
    code?: string
    name?: string
    itemGroupId?: string
    page?: number
    size?: number
}) {
    return useQuery<PageItemDto, Error>({
        queryKey: ['items', params],
        queryFn: () => Service.search10(
            params.code,
            params.name,
            params.itemGroupId,
            params.page,
            params.size
        ),
    })
}
