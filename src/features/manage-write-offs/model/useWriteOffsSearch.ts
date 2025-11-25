'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageWriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'

export function useWriteOffsSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageWriteOffDocumentDto, Error>({
        queryKey: ['write-offs', 'search', params],
        queryFn: () => Service.search9(
            params.warehouseId,
            params.from,
            params.to,
            params.page,
            params.size
        ),
    })
}
