'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageOrgUnitDto } from '@/shared/api/generated/__swagger_client'

export function useOrgUnits(params: {
    code?: string,
    name?: string,
    organizationId?: string,
    page?: number
    size?: number
}) {
    return useQuery<PageOrgUnitDto, Error>({
        queryKey: ['org-units', params],
        queryFn: () => Service.search7(
            params.code,
            params.name,
            params.organizationId,
            params.page,
            params.size
        ),
    })
}