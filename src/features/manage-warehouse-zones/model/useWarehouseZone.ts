'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'

export function useWarehouseZone(id?: string) {
    return useQuery<WarehouseZoneDto, Error>({
        queryKey: ['warehouseZones', id],
        queryFn: () => Service.get1(id!),
        enabled: !!id,
    })
}
