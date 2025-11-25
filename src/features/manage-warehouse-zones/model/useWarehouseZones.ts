'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'

export function useWarehouseZones(warehouseId?: string) {
    return useQuery<WarehouseZoneDto[], Error>({
        queryKey: ['warehouseZones', warehouseId],
        queryFn: () => warehouseId ? Service.listByWarehouse(warehouseId) : Promise.resolve([]),
        enabled: !!warehouseId,
    })
}
