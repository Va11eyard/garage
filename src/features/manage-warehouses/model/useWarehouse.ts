'use client'

import { useQuery } from '@tanstack/react-query'
import { type WarehouseDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseService } from "./service";
const service = new WarehouseService();
export function useWarehouse(id?: string) {
    return useQuery<WarehouseDto, Error>({
        queryKey: ['warehouses', id],
        queryFn: () => service.get(id!),
        enabled: !!id,
    })
}
