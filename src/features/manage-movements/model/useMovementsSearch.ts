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
        queryFn: () => {
            if (!params.warehouseId) {
                return { content: [], totalPages: 0, totalElements: 0 }
            }
            return Service.searchMovementDocumentsByToWarehouse(
                params.warehouseId,
                { page: params.page, size: params.size }
            )
        },
        enabled: !!params.warehouseId
    })
}
