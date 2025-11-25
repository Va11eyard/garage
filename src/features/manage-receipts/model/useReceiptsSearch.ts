'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useReceiptsSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageReceiptDocumentDto, Error>({
        queryKey: ['receipts', 'search', params],
        queryFn: () => Service.search8(
            params.warehouseId,
            params.from,
            params.to,
            params.page,
            params.size
        ),
    })
}
