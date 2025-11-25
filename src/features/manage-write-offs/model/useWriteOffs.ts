'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageWriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useWriteOffs(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    size?: number
}) {
    return useQuery<PageWriteOffDocumentDto, Error>({
        queryKey: ['writeOffs', params],
        queryFn: () => Service.search8(
            params.warehouseId,
            params.documentNumber,
            params.dateFrom,
            params.dateTo,
            params.page,
            params.size
        ),
    })
}
