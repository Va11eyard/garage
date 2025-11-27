'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageQualityAcceptanceDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useQualityAcceptancesByWarehouse(params: {
    warehouseId: string
    from?: string
    to?: string
    status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
    page?: number
    size?: number
}) {
    return useQuery<PageQualityAcceptanceDocumentDto, Error>({
        queryKey: ['qualityAcceptances', params],
        queryFn: () => Service.search14(
            params.warehouseId,
            params.from,
            params.to,
            params.status,
            params.page,
            params.size
        ),
        enabled: !!params.warehouseId,
    })
}
