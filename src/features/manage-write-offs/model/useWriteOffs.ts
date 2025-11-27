'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type PageWriteOffDocumentDto } from '@/shared/api/generated/__swagger_client'
import { WriteOffService} from "@/features/manage-write-offs/model/service";
const service = new WriteOffService();
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
