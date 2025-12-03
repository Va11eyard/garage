'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageQualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'
import { QualityAcceptanceService } from './QualityAcceptanceService'

const service = new QualityAcceptanceService()

export function useQualityAcceptances(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
    page?: number
    size?: number
}) {
    return useQuery<PageQualityAcceptanceDocumentDto, Error>({
        queryKey: ['qualityAcceptances', params],
        queryFn: () => service.search({
            warehouseId: params.warehouseId,
            from: params.dateFrom,
            to: params.dateTo,
            status: params.status,
            page: params.page,
            size: params.size
        }),
    })
}
