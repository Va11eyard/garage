'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageReturnDocumentDto } from '@/shared/api/generated/__swagger_client'
import { ReturnService } from "./service";
const service = new ReturnService();

export function useReturns(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    size?: number
}) {
    return useQuery<PageReturnDocumentDto, Error>({
        queryKey: ['returns', params],
        queryFn: () => service.searchByWarehouse(
            params.warehouseId!,
            params.dateFrom,
            params.dateTo,
            undefined,
            params.page,
            params.size
        ),
    })
}
