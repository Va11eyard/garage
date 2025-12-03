'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageProvisionNormDto } from '@/shared/api/generated/__swagger_client'

export function useNorms(params?: {
    code?: string
    name?: string
    page?: number
    size?: number
}) {
    return useQuery<PageProvisionNormDto, Error>({
        queryKey: ['norms', params],
        queryFn: () => Service.searchProvisionNormsPage(
            params?.code,
            params?.name,
            undefined,
            params?.page?.toString(),
            params?.size?.toString()
        ),
    })
}
