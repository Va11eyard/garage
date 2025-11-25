'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useReceipts(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    size?: number
}) {
    return useQuery<PageReceiptDocumentDto, Error>({
        queryKey: ['receipts', params],
        queryFn: () => Service.search13(
            params.warehouseId,
            undefined,
            params.dateFrom,
            params.dateTo,
            params.page,
            params.size
        ),
    })
}
