'use client'

import { useQuery } from '@tanstack/react-query'
import { type WarehouseCellDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useWarehouseCellsByWarehouse(warehouseId?: string) {
    return useQuery<WarehouseCellDto[], Error>({
        queryKey: ['warehouseCells', 'warehouse', warehouseId],
        queryFn: () => warehouseId ? service.listByWarehouse(warehouseId) : Promise.resolve([]),
        enabled: !!warehouseId,
    })
}

export function useWarehouseCellsByZone(zoneId?: string) {
    return useQuery<WarehouseCellDto[], Error>({
        queryKey: ['warehouseCells', 'zone', zoneId],
        queryFn: () => zoneId ? service.listByZone(zoneId) : Promise.resolve([]),
        enabled: !!zoneId,
    })
}
