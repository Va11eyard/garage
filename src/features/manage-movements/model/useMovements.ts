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
        queryFn: () => Service.searchMovementDocumentsByFromWarehouse(
            params.warehouseId || '',
            { page: params.page, size: params.size }
        ),
    })
}
