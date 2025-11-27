'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageQualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useQualityAcceptances(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    size?: number
}) {
    return useQuery<PageQualityAcceptanceDocumentDto, Error>({
        queryKey: ['qualityAcceptances', params],
        queryFn: () => Service.search15(
            params.warehouseId,
            params.dateFrom,
            params.dateTo,
            undefined,
            params.documentNumber,
            params.page,
            params.size
        ),
    })
}
