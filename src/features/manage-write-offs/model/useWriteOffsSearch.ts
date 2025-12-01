'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageWriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'
import { WriteOffService} from "@/features/manage-write-offs/model/service";
const service = new WriteOffService();
export function useWriteOffsSearch(params: {
    warehouseId?: string
    from?: string
    to?: string
    page?: number
    size?: number
}) {
    return useQuery<PageWriteOffDocumentDto, Error>({
        queryKey: ['write-offs', 'search', params],
        queryFn: () => service.searchByWarehouse({
            warehouseId: params.warehouseId || '',
            from: params.from,
            to: params.to,
            page: params.page,
            size: params.size
        }),
    })
}
