'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useMovements(params: {
    type?: 'INTERNAL' | 'EXTERNAL'
    warehouseId?: string
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['movements', params],
        queryFn: () => {
            if (!params.warehouseId) {
                return { content: [], totalPages: 0, totalElements: 0 }
            }
            return Service.searchMovementDocumentsByFromWarehouse(
                params.warehouseId,
                { page: params.page, size: params.size }
            )
        },
        enabled: !!params.warehouseId
    })
}
