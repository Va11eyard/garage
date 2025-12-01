'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageTemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useTemporaryIssuesSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageTemporaryIssueDocumentDto, Error>({
        queryKey: ['temporary-issues', 'search', params],
        queryFn: () => Service.searchByWarehouse1(
            params.warehouseId || '',
            params.from as any,
            params.to as any,
            params.page as any,
            params.size
        ),
    })
}
