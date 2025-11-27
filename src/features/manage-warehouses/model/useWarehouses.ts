'use client'

import { useQuery } from '@tanstack/react-query'
import { type Page } from '@/shared/api/generated/__swagger_client'
import { WarehouseService } from "./service";
const service = new WarehouseService();
export function useWarehouses(params?: {
    code?: string
    name?: string
    page?: number
    size?: number
}) {
    return useQuery<Page, Error>({
        queryKey: ['warehouses', params],
        queryFn: () => service.search(
            params?.code,
            params?.name,
            params?.page,
            params?.size,
        ),
    })
}
