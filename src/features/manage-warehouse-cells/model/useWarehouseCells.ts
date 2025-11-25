'use client'

import { useQuery } from '@tanstack/react-query'
import { Service, type WarehouseCellDto } from '@/shared/api/generated/__swagger_client'

export function useWarehouseCellsByWarehouse(warehouseId?: string) {
    return useQuery<WarehouseCellDto[], Error>({
        queryKey: ['warehouseCells', 'warehouse', warehouseId],
        queryFn: () => warehouseId ? Service.listByWarehouse1(warehouseId) : Promise.resolve([]),
        enabled: !!warehouseId,
    })
}

export function useWarehouseCellsByZone(zoneId?: string) {
    return useQuery<WarehouseCellDto[], Error>({
        queryKey: ['warehouseCells', 'zone', zoneId],
        queryFn: () => zoneId ? Service.listByZone(zoneId) : Promise.resolve([]),
        enabled: !!zoneId,
    })
}
