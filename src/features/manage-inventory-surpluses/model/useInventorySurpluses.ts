'use client'

import { useQuery } from '@tanstack/react-query'
import { type PageInventorySurplusDocumentDto } from '@/shared/api/generated/__swagger_client'
import { InventorySurplusService } from './service'

const service = new InventorySurplusService()

export function useInventorySurpluses(params: {
    warehouseId?: string
    documentNumber?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    size?: number
}) {
    return useQuery<PageInventorySurplusDocumentDto, Error>({
        queryKey: ['inventorySurpluses', params],
        queryFn: () => service.search({
            warehouseId: params.warehouseId,
            from: params.dateFrom,
            to: params.dateTo,
            docNumber: params.documentNumber,
            page: params.page,
            size: params.size
        }),
    })
}
