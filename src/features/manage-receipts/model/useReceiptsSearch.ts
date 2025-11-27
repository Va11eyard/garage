'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function useReceiptsSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageReceiptDocumentDto, Error>({
        queryKey: ['receipts', 'search', params],
        queryFn: () => service.search(
            params.warehouseId,
            params.from,
            params.to,
            params.page,
            params.size
        ),
    })
}
