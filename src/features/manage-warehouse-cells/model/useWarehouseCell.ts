'use client'

import { useQuery } from '@tanstack/react-query'
import { type WarehouseCellDto } from '@/shared/api/generated/__swagger_client'
import { WarehouseCellService } from './service'

const service = new WarehouseCellService()

export function useWarehouseCell(id: string) {
    return useQuery<WarehouseCellDto, Error>({
        queryKey: ['warehouseCell', id],
        queryFn: () => service.get(id),
        enabled: !!id,
    })
}
