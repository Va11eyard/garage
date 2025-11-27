'use client'

import { useQuery } from '@tanstack/react-query'
import { type WarehouseZoneDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseZoneService } from './service'

const service = new WarehouseZoneService()

export function useWarehouseZone(id?: string) {
    return useQuery<WarehouseZoneDto, Error>({
        queryKey: ['warehouseZones', id],
        queryFn: () => service.get(id!),
        enabled: !!id,
    })
}
