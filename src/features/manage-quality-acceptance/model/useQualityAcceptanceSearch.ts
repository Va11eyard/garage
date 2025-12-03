'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageQualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'
import { QualityAcceptanceService } from './QualityAcceptanceService'

const service = new QualityAcceptanceService()

export function useQualityAcceptanceSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
    page?: number
    size?: number
}) {
    return useQuery<PageQualityAcceptanceDocumentDto, Error>({
        queryKey: ['quality-acceptance', 'search', params],
        queryFn: () => service.search({
            warehouseId: params.warehouseId,
            from: params.from,
            to: params.to,
            status: params.status,
            page: params.page,
            size: params.size
        }),
    })
}
