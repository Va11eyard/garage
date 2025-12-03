'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageIssueDocumentDto } from '@/shared/api/generated/__swagger_client'
import { IssueService } from './service'

const service = new IssueService()

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
        queryFn: () => service.searchByWarehouse({
            warehouseId: params.warehouseId!,
            from: params.dateFrom,
            to: params.dateTo,
            page: params.page,
            size: params.size
        }),
    })
}
