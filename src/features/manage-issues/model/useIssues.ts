'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageIssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useIssues(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    size?: number
}) {
    return useQuery<PageIssueDocumentDto, Error>({
        queryKey: ['issues', params],
        queryFn: () => Service.search3(
            params.warehouseId,
            params.documentNumber,
            params.dateFrom,
            params.dateTo,
            params.page,
            params.size
        ),
    })
}
