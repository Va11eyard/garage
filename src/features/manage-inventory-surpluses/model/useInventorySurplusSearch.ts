'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageInventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useInventorySurplusSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageInventorySurplusDocumentDto, Error>({
        queryKey: ['inventory-surpluses', 'search', params],
        queryFn: () => service.search({
            warehouseId: params.warehouseId,
            from: params.from,
            to: params.to,
            page: params.page,
            size: params.size
        }),
    })
}
