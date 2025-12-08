'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useConsolidationDashboard() {
    return useQuery({
        queryKey: ['consolidation-dashboard'],
        queryFn: () => Service.getConsolidationDashboard(),
        retry: false,
        throwOnError: false,
    })
}
