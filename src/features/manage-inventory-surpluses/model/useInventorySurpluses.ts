'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageInventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useInventorySurpluses(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    size?: number
}) {
    return useQuery<PageInventorySurplusDocumentDto, Error>({
        queryKey: ['inventorySurpluses', params],
        queryFn: () => Service.search2(
            params.warehouseId,
            params.documentNumber,
            params.dateFrom,
            params.dateTo,
            params.page,
            params.size
        ),
    })
}
