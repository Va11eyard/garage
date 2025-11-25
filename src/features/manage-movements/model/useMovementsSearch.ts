'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useMovementsSearch(params: {
    warehouseId?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['movements', 'search', params],
        queryFn: () => Service.searchByToWarehouse(
            params.warehouseId || '',
            { page: params.page, size: params.size }
        ),
    })
}
