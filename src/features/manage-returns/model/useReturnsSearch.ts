'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageReturnDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReturnService } from "./service";
const service = new ReturnService();
export function useReturnsSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageReturnDocumentDto, Error>({
        queryKey: ['returns', 'search', params],
        queryFn: () => service.searchByWarehouse(
            params.warehouseId || '',
            params.from,
            params.to,
            params.page,
            params.size
        ),
    })
}
