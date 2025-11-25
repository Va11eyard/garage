'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageInventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useInventorySurplusSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageInventorySurplusDocumentDto, Error>({
        queryKey: ['inventory-surpluses', 'search', params],
        queryFn: () => Service.searchByWarehouse5(
            params.warehouseId || '',
            { page: params.page, size: params.size }
        ),
    })
}
