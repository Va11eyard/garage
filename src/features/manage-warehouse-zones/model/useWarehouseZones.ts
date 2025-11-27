'use client'

import { useQuery } from '@tanstack/react-query'
import { type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useWarehouseZones(warehouseId?: string) {
    return useQuery<WarehouseZoneDto[], Error>({
        queryKey: ['warehouseZones', warehouseId],
        queryFn: () => warehouseId ? service.listByWarehouse(warehouseId) : Promise.resolve([]),
        enabled: !!warehouseId,
    })
}
