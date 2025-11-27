'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageOrganizationDto } from '@/shared/api/generated/__swagger_client'
import { OrganizationService } from './service'

const service = new OrganizationService()

export function useOrganizations(params: {
    code?: string,
    name?: string,
    page?: number
    size?: number
}) {
    return useQuery<PageOrganizationDto, Error>({
        queryKey: ['organizations', params],
        queryFn: () => service.search({
            code: params.code,
            name: params.name,
            page: params.page,
            size: params.size
        }),
    })
}