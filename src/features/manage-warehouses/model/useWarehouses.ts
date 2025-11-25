'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type Page } from '@/shared/api/generated/__swagger_client'

export function useWarehouses(params?: {
    code?: string
    name?: string
    organizationId?: string
    page?: number
    size?: number
}) {
    return useQuery<Page, Error>({
        queryKey: ['warehouses', params],
        queryFn: () => Service.search(
            params?.code,
            params?.name,
            params?.organizationId,
            params?.page,
            params?.size as any,
        ),
    })
}
