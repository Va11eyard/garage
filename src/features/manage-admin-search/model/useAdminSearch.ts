'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useAdminSearch(query: string) {
    return useQuery({
        queryKey: ['admin-search', query],
        queryFn: () => Service.adminGlobalSearch(query),
        enabled: query.length >= 3,
    })
}
