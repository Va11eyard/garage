'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageOrganizationDto } from '@/shared/api/generated/__swagger_client'

export function useOrganizations(params: {
    code?: string,
    name?: string,
    page?: number
    size?: number
}) {
    return useQuery<PageOrganizationDto, Error>({
        queryKey: ['organizations', params],
        queryFn: () => Service.search3(
            params.code,
            params.name,
            params.page,
            params.size
        ),
    })
}