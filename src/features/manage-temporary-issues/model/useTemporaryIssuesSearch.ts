'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageTemporaryIssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { TemporaryIssueService } from './service'

const service = new TemporaryIssueService()

export function useTemporaryIssuesSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    status?: 'DRAFT' | 'POSTED' | 'CANCELLED'
    page?: number
    size?: number
}) {
    return useQuery<PageTemporaryIssueDocumentDto, Error>({
        queryKey: ['temporary-issues', 'search', params],
        queryFn: () => service.searchByWarehouse({
            warehouseId: params.warehouseId!,
            from: params.from,
            to: params.to,
            status: params.status,
            page: params.page,
            size: params.size
        }),
        enabled: !!params.warehouseId, // Only fetch when warehouseId is provided
    })
}
