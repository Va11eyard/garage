'use client'

import { useQuery } from '@tanstack/react-query'
import { Service } from '@/shared/api/generated/__swagger_client'

export function useInventories(params: {
    warehouseId?: string
    fromDate?: string
    toDate?: string
    status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
    page?: number
    size?: number
}) {
    return useQuery({
        queryKey: ['inventories', params],
        queryFn: () => {
            if (!params.warehouseId) return { content: [], totalPages: 0, totalElements: 0 }

            return Service.searchInventoryDocumentsByWarehouse(
                params.warehouseId,
                {
                    page: params.page,
                    size: params.size,
                },
                params.fromDate,
                params.toDate,
                params.status
            )
        },
        enabled: !!params.warehouseId
    })
}
