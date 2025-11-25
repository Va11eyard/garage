'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageQualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useQualityAcceptanceSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageQualityAcceptanceDocumentDto, Error>({
        queryKey: ['quality-acceptance', 'search', params],
        queryFn: () => Service.searchByWarehouse4(
            params.warehouseId || '',
            params.from,
            params.to,
            params.page,
            params.size
        ),
    })
}
