'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageReceiptDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReceiptService } from './service'
const service = new ReceiptService()
export function useReceipts(params: {
    warehouseId?: string,
    status?: 'DRAFT' | 'POSTED' | 'CANCELLED',
    documentNumber?: string
    fromDate?: string
    toDate?: string
    page?: number
    size?: number
}) {
    return useQuery<PageReceiptDocumentDto, Error>({
        queryKey: ['receipts', params],
        queryFn: () => service.search(
            params.warehouseId,
            params.status,
            params.fromDate,
            params.toDate,
            params.page,
            params.size
        ),
    })
}
