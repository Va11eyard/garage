'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type WarehouseDto } from '@/shared/api/generated/__swagger_client'

export function useWarehouse(id?: string) {
    return useQuery<WarehouseDto, Error>({
        queryKey: ['warehouses', id],
        queryFn: () => Service.get(id!),
        enabled: !!id,
    })
}
