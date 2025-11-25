'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageReturnDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useReturns(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    size?: number
}) {
    return useQuery<PageReturnDocumentDto, Error>({
        queryKey: ['returns', params],
        queryFn: () => Service.search7(
            params.warehouseId,
            params.documentNumber,
            params.dateFrom,
            params.dateTo,
            params.page,
            params.size
        ),
    })
}
